const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{5,18}$/;
const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const notValidCredentials = 'Not valid credentials';

module.exports = {
  passwordRegEx,
  emailRegEx,
  notValidCredentials,
};
