const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const User = require('../models/userModel');
const { createError } = require('../helpers');

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  try {
    if (bearer !== 'Bearer' || token === '') {
      throw createError(401, 'Unauthorized');
    }
    const { id } = jwt.verify(token, jwtSecret);
    const user = await User.findById(id);

    if (!user) {
      throw createError(404, 'User not found');
    }

    if (!user.token) {
      throw createError(401, 'Not authorized');
    }
    // req.user = { id: user._id, email: user.email, subscription: user.subscription };
    req.user = user;
    next();
  } catch (error) {
    const authError = createError(error.status || 401, error.message || 'Unauthorized');
    next(authError);
  }
};

module.exports = authenticate;
