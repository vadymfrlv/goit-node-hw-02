const User = require('../models/userModel');

const updateAvatar = async ({ userId, avatarURL }) => {
  const result = await User.findByIdAndUpdate(userId, { avatarURL });
  return result;
};

module.exports = updateAvatar;
