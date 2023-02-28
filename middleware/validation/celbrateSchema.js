// const Joi = require('joi');
const { celebrate, Joi, errors, Segments } = require('celebrate');



module.exports.user_schema = celebrate({
    [Segments.BODY]: Joi.object().keys({
        firstName: Joi.string().alphanum().min(0).required(),
        lastName: Joi.string().required(),
        userEmail: Joi.string().email().required(),
        password: Joi.string().min(7).required(),

    })
});

module.exports.gym_schema = celebrate({
    [Segments.BODY]: Joi.object().keys({
        gymName: Joi.string().alphanum().min(3).required(),
        location: Joi.string().required(),
        phoneNum: Joi.number().min(10).required(),
    
    })
});

module.exports.session_schema = celebrate({
    [Segments.BODY]: Joi.object().keys({
        gymId:Joi.number().min(0).required(),
        trainerId:Joi.number().min(0).required(),
        sessionName: Joi.string().alphanum().min(3).required(),
        price: Joi.number().min(0).required(),
        capacity: Joi.number().min(0).required(),
        type:Joi.string().required(),

    })
});

module.exports.trainer_schema = celebrate({
    [Segments.BODY]: Joi.object().keys({
        gymId:Joi.number().min(0).required(),
        trainerName: Joi.string().alphanum().min(3).required(),
        experiance: Joi.number().required(),
        bio:Joi.string().required(),
        phoneNum: Joi.number().min(10).required(),
        

    })
});



