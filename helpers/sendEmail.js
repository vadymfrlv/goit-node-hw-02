const sgMail = require('@sendgrid/mail');
const { sgKey } = require('../config');

sgMail.setApiKey(sgKey);

const sendEmail = async data => {
  const email = { ...data, from: 'vadymfrlv@meta.ua' };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = sendEmail;
