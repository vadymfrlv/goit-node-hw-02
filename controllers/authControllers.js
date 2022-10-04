const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const Service = require('../services/authService');
const { jwtSecret } = require('../config');

const signUpCtrl = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const userCheck = await Service.userCheck(email);

    if (userCheck) {
      res.status(409).json({ message: 'Email in use' });
      return;
    }

    const avatarURL = gravatar.url(email);
    const user = await Service.registartion({ name, email, password, avatarURL });

    res.status(201).json({
      user: {
        name: user.name,
        email: user.email,
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
    if (!user) {
      res.status(401).json({ message: 'Email or password is wrong' });
      return;
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      res.status(401).json({ message: 'Email or password is wrong' });
      return;
    }

    const payload = { userId: user._id, subscription: user.subscription };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '9h' });

    const result = await Service.setUserLoginToken({ userId: user._id, token });

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
    await Service.setUserLoginToken({ userId, token: '' });
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const currentCtrl = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const user = await Service.getUserById({ userId });

    res.status(200).json({
      name: user.name,
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const subscriptionCtrl = async (req, res, next) => {
  const { userId } = req.user;
  const { subscription } = req.body;

  try {
    const result = await Service.subscriptionUpd({ userId, subscription });

    if (!result) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    res
      .status(200)
      .json({ name: result.name, email: result.email, subscription: result.subscription });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { signUpCtrl, loginCtrl, logoutCtrl, currentCtrl, subscriptionCtrl };
