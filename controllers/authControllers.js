const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Service = require('../services/authService');
const { jwtSecret } = require('../config');

const signUpCtrl = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userCheck = await Service.userCheck(email);

    if (userCheck) {
      res.status(409).json({ message: 'Email in use' });
      return;
    }

    const result = await Service.registartion({ email, password });

    res.status(201).json({
      user: {
        email: result.email,
        subscription: 'starter',
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginCtrl = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await Service.userCheck(email);
    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!user || !passwordCheck) {
      res.status(401).json({ message: 'Email or password is wrong' });
      return;
    }

    const payload = { userId: user._id, subscription: user.subscription };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '9h' });

    const result = await Service.updateUserToken({ userId: user._id, token });

    res.status(200).json({
      token: result.token,
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logoutCtrl = async (req, res, next) => {
  const { userId } = req.user;

  try {
    await Service.setUserLoginToken(userId);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const currentCtrl = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const user = await Service.getUserById(userId);
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const subscriptionCtrl = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const result = await Service.subscription(userId, req.body);

    if (!result) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    res.status(200).json({ email: result.email, subscription: result.subscription });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { signUpCtrl, loginCtrl, logoutCtrl, currentCtrl, subscriptionCtrl };
