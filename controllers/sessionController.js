const {Router} = require('express');
const db = require('../sequilize');
const router = Router();

const Session = db.session;
const Gym  = db.gym;
const Trainer = db.trainer;


module.exports.getAllSessionInGym = async (req,res)=>{
    const gymId = req.query.gymId
    // console.log(req.query.gymId)
    try{
        // console.log(gymId)
        const gym = await Gym.findByPk(gymId)
        // console.log(gym)
        const session = await Session.findAll({
            where:
            {
                GymId:gymId
            },
            include:{
               model: Trainer
            }
        })
        const trainers = await gym.getTrainers();
        const relatedTrainer = await Trainer.findAll({
            where:
            {
                
            }
        })
        console.log(trainers)
        res.status(200).json(session)
    }catch{
    res.status(404).json({gym:'wrong'})
    }
}

module.exports.createSession = async(req,res)=>{
    // console.log(req.body)


    try{
        // const gymId = req.query.gymId
        // console.log(req.params)
        console.log(req.body)

       

        // console.log(trainer.dataValues.Gyms[0].dataValues.id)
        // if(gym instanceof trainer.getGyms()){}
        if (req.user.role==='admin') {
            const {sessionName,price,capacity,type,trainerId,gymId}= req.body;
        const trainer =await Trainer.findByPk(trainerId)
        console.log(trainerId)
        const gym = await Gym.findByPk(gymId);


        const session = await Session.create({sessionName,price,capacity,type});
        session.setGym(gym);
        session.setTrainer(trainer);

        res.status(202).json(session);

        }else{

            res.status(403).json({ message: 'not authurized' });
        }
        

    }catch{

        res.json('did not create session')
    }
}

module.exports.deleteSession = async (req,res)=>{
    try{
        if (req.user.role==='admin') {
            // const gymId = req.params.gymid;
        const sessionId = req.params.id;

        const session = await Session.findByPk(sessionId);

        await session.destroy();

        res.json('session deleted')

        }else{
            
            res.status(403).json({ message: 'not authurized' });


        }
        

    }catch{
        res.json('did not delete session')
    }
}
