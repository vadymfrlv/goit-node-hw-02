const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).max(20).required(),
});

module.exports = schema;
