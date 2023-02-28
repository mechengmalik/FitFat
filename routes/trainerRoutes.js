const {Router} = require('express');
const schemas = require('../middleware/validation/celbrateSchema');
const trainerController = require('../controllers/trainerController')
const auth = require('../controllers/userController')
const router = Router();

router.get('/trainers',auth.requireAuth,trainerController.getAllTrainersInGym);
router.post('/trainers',auth.requireAuth,schemas.trainer_schema,trainerController.createTrainer);
router.delete('/trainers/:id',auth.requireAuth,trainerController.deleteTrainer);
router.put('/updateTrainer:trainerId',trainerController.updateTrainer);



module.exports= router;