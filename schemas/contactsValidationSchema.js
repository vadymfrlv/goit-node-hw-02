const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).max(20).required(),
  favorite: Joi.boolean().required(),
});

const schemaUpd = Joi.object({
  name: Joi.string().min(2).max(20).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().min(7).max(20).optional(),
  favorite: Joi.boolean().required(),
});

module.exports = { schema, schemaUpd };
