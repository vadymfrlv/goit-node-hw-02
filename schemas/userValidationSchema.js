const Joi = require('joi');
const { emailRegEx, passwordRegEx, notValidCredentials } = require('../constants');

const schema = Joi.object({
  email: Joi.string().regex(emailRegEx).message(notValidCredentials).required(),
  password: Joi.string().regex(passwordRegEx).message(notValidCredentials).required(),
});

const schemaSubscription = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

module.exports = { schema, schemaSubscription };
