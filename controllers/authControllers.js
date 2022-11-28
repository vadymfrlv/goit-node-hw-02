const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const short = require('shortid');

const Service = require('../services/authService');
const { sendEmail, emailTemplate } = require('../helpers');
const { jwtSecret } = require('../config');

const signUpCtrl = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const userCheck = await Service.userCheck(email);

    if (userCheck) {
      res.status(409).json({ message: `Email "${email}" already used` });
      return;
    }

    const verificationToken = short();
    const avatarURL = gravatar.url(email, { s: '200', d: 'mp' }, false);
    const user = await Service.registartion({
      name,
      email,
      password,
      avatarURL,
      verificationToken,
    });

    const mail = emailTemplate(email, verificationToken);
    await sendEmail(mail);

    res.status(201).json({
      user: {
        name: user.name,
        email: user.email,
        subscription: 'starter',
        verificationToken: user.verificationToken,
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

    if (!user.verify) {
      res.status(401).json({ message: 'Email not verified' });
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

const emailVerify = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const user = await Service.checkVerifyToken({ verificationToken });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await Service.emailVerification(user._id, { verify: true, verificationToken: '' });
    res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const emailVerifyRepeat = async (req, res, next) => {
  const { email } = req.body;

  try {
    const userCheck = await Service.userCheck(email);
    const { verify, verificationToken } = userCheck;

    if (verify) {
      res.status(400).json({ message: 'Verification has already been passed' });
      return;
    }

    const mail = emailTemplate(email, verificationToken);
    await sendEmail(mail);
    res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  signUpCtrl,
  loginCtrl,
  logoutCtrl,
  currentCtrl,
  subscriptionCtrl,
  emailVerify,
  emailVerifyRepeat,
};
