const authenticate = require('./authentication');
const validation = require('./validation');
const upload = require('./upload');

module.exports = {
  validation,
  authenticate,
  upload,
};
