const emailTemplate = (email, verificationToken) => {
  const message = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Please verify your email</a>`,
  };
  return message;
};

module.exports = emailTemplate;
