const {Router} = require('express');
const userController = require('../controllers/userController');
const schemas = require('../middleware/validation/celbrateSchema');


const router = Router();

router.get('/signup',userController.signup_get);

router.post('/signup',schemas.user_schema,userController.signup_post);

router.get('/login',userController.requireAuth,userController.login_get);

router.post('/login',userController.login_post);

router.post('/logout', async (req, res) => {
    try {
      res.clearCookie('jwt cookie'); 
      res.status(200).send({ message: 'Logged out successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });

  


module.exports= router;