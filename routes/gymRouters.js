const {Router} = require('express');
const schemas = require('../middleware/validation/celbrateSchema');
const auth = require('../controllers/userController')
const gymController = require('../controllers/gymController')

const router = Router();

//GYM ROUTES
router.get('/gym',auth.requireAuth,gymController.getAllGem)
router.post('/gym',auth.requireAuth,schemas.gym_schema,gymController.createGym);
router.delete('/gym/:id',auth.requireAuth,gymController.deleteGym);
router.put('/updateGym:id',auth.requireAuth,gymController.updateGym);


module.exports= router;