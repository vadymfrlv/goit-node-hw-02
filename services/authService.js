const User = require('../models/userModel');

const userCheck = async email => {
  const user = await User.findOne({ email });
  return user;
};

const setUserLoginToken = async ({ userId, token }) => {
  const result = await User.findByIdAndUpdate(userId, { token: token }, { new: true });
  return result;
};

const registartion = async ({ name, email, password, avatarURL, verificationToken }) => {
  const user = new User({ name, email, password, avatarURL, verificationToken });
  await user.save();
  return user;
};

const logout = async ({ userId }) => {
  const user = await User.findByIdAndUpdate(userId);
  return user;
};

const getUserById = async ({ userId }) => {
  const user = await User.findById(userId);
  return user;
};

const subscriptionUpd = async ({ userId, subscription }) => {
  const result = await User.findByIdAndUpdate(userId, subscription, { new: true });
  return result;
};

const checkVerifyToken = async ({ verificationToken }) => {
  const result = await User.findOne({ verificationToken });
  return result;
};

const emailVerification = async (userId, verificationToken) => {
  const result = await User.findByIdAndUpdate(userId, verificationToken);
  return result;
};

module.exports = {
  userCheck,
  setUserLoginToken,
  registartion,
  logout,
  getUserById,
  subscriptionUpd,
  checkVerifyToken,
  emailVerification,
};
