const {Router} = require('express');
const schemas = require('../middleware/validation/celbrateSchema');
const auth = require('../controllers/userController')
const sessionController = require('../controllers/sessionController')

const router = Router();

router.get('/sessions',auth.requireAuth,sessionController.getAllSessionInGym);
router.post('/sessions',auth.requireAuth,schemas.session_schema,sessionController.createSession);
router.delete('/sessions/:id',auth.requireAuth,sessionController.deleteSession);

module.exports= router;