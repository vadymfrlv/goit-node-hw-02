const Joi = require('joi');
const { emailRegEx, passwordRegEx, notValidCredentials } = require('../constants');

const schemaSignUp = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().regex(emailRegEx).message(notValidCredentials).required(),
  password: Joi.string().regex(passwordRegEx).message(notValidCredentials).required(),
});

const schemaLogin = Joi.object({
  email: Joi.string().regex(emailRegEx).message(notValidCredentials).required(),
  password: Joi.string().regex(passwordRegEx).message(notValidCredentials).required(),
});

const schemaSubscription = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

module.exports = { schemaSignUp, schemaLogin, schemaSubscription };
