const Joi = require("joi");

const schemas = {
  examSchema: Joi.object().keys({
    name: Joi.string().required(),
  }),
  questionSchema: Joi.object().keys({
    duration: Joi.number(),
    text: Joi.string().required(),
    answers: Joi.array(),
  }),
  userSchema: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string(),
  }),
};

module.exports = schemas;
