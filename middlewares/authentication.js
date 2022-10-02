const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { getUserById } = require('../services/authService');
const { createError } = require('../helpers');

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || token === '') {
    throw createError(401, 'Unauthorized');
  }

  try {
    const { userId } = jwt.verify(token, jwtSecret);
    const user = await getUserById({ userId });

    if (!user) {
      throw createError(404, 'User not found');
    }

    if (!user.token) {
      throw createError(401, 'Unauthorized');
    }

    req.user = { userId: user._id, email: user.email, subscription: user.subscription };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = authenticate;
