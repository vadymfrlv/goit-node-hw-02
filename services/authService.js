const User = require('../models/userModel');

const signUp = async (email, password) => {
  const user = new User({ email, password });

  await user.save();
  return user;
};

const login = async email => {
  const user = await User.findOne({ email });
  return user;
};

const getUserById = async userId => {
  const user = await User.findById(userId);
  return user;
};

const logout = async userId => {
  const user = await User.findByIdAndUpdate(userId, { token: '' });
  return user;
};

const updateSubscription = async (userId, subscription) => {
  const result = await User.findByIdAndUpdate(userId, { subscription }, { new: true });
  return result;
};

module.exports = { signUp, login, getUserById, logout, updateSubscription };
