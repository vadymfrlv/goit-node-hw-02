const fs = require('fs').promises;
const path = require('path');
const Jimp = require('jimp');

const Service = require('../services/avatarsService');
const avatarDir = path.resolve('./public/avatars');

const updateAvatarCtrl = async (req, res, next) => {
  const { userId } = req.user;
  const { path: tempPath, originalname } = req.file;
  const [extension] = originalname.split('.').reverse();
  const newName = `${userId}.${extension}`;
  const uploadPath = path.join(avatarDir, newName);

  try {
    Jimp.read(tempPath, (error, img) => {
      if (error) throw error;
      img.cover(250, 250).write(uploadPath);
    });

    await fs.rename(tempPath, uploadPath);
    const avatarURL = path.join(`/avatars/${newName}`);
    await Service.updateAvatar({ userId, avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    res.status(401).json({ message: error.message });
  }
};

module.exports = updateAvatarCtrl;
