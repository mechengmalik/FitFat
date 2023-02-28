const db = require('../sequilize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = db.user;

const expireTime = 2 * 24 * 60 * 60
const createToken = (user) => {
    return jwt.sign({
        userId: user.id,
        userEmail: user.userEmail,
        role: user.role}, 'fitfat secret', {
        expiresIn: expireTime
    })
}


module.exports.signup_get = (req, res) => {
    res.send('signup get');
}

module.exports.signup_post = async (req, res) => {
    // console.log(req.body)

    try {
        const salt = await bcrypt.genSalt();
        let { firstName, lastName, userEmail, password } = req.body;
        password = await bcrypt.hash(password, salt);


        const newUser = await User.create({ firstName, lastName, userEmail, password });

        const token = createToken(newUser)

        res.cookie('jwt token', token, { httpOnly: false, maxAge: expireTime })
        console.log(newUser.role)

        res.status(200).json({ token:token,userRole:newUser.role })



    } catch (err) {
        // console.log(err.message);
        res.send(err.message)
    }


}

module.exports.login_get = async(req, res) => {
        console.log(req.user)
    
        try{
    
            const userId = req.user.id;
    
            const userinfo = await User.findByPk(userId)
            console.log(userId,'fffffffffffffffffffff')

        
            res.status(201).json(userinfo)
    
        }catch(err){
            res.status(404).json({err})
        }
       

}

module.exports.login_post = async (req, res) => {
    try {
        const userEmail = req.body.userEmail;
        const password = req.body.password
        // console.log(req.body)
        

        const checkedUser = await User.findOne({
            where: { userEmail: userEmail }
        })

        console.log(checkedUser)
        const valid = await bcrypt.compare(password, checkedUser.password)
        // console.log(valid)
        // console.log(password)
        // console.log(checkedUser.password)




        if (checkedUser) {
            // console.log(checkedUser)

            if (valid) {
                const token = createToken(checkedUser)
                console.log(checkedUser)

                res.cookie('jwt token', token, { httpOnly: false, maxAge: expireTime })
                
                res.status(200).json({ token:token,userRole:checkedUser.role })

            } else {
                res.status(404).json('user dont exist')
            }



        }

    } catch (err) {
        console.log(err)
        res.send(err.message)
    }
    // res.send('user loged in')

}

module.exports.requireAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  console.log(token)
  console.log('ssssssssssssssssssssssssssssssssss',token)
    
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    jwt.verify(token, 'fitfat secret', async (err, decodedToken) => {
        if (err) {
            console.log(err)
            console.log(decodedToken)
            console.log(token)

            return res.status(401).json({ message: 'Invalid token' });
        }

        try {
            const user = await User.findByPk(decodedToken.userId);
            if (!user) {
                return res.status(401).json({ message: 'Invalid user' });
            }

            // Check user role for authorization
            if (user.role !== 'admin') {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            req.user = user;
            next();
           
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    });

}

  
      

