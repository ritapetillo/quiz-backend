const Joi = require("joi");

const schemas = {
  examSchema: Joi.object().keys({
    candidateName: Joi.string().required(),
    name: Joi.string().required(),
  }),
  questionSchema: Joi.object().keys({
    duration: Joi.number(),
    text: Joi.string().required(),
    answers: Joi.array(),
  }),
};

module.exports = schemas;
