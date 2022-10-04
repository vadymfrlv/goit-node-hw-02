const multer = require('multer');
const path = require('path');
const short = require('shortid');

const tempDir = path.resolve('./tmp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.');
    cb(null, `${short()}.${extension}`);
  },
  limits: {
    fileSize: 1024,
  },
});

const upload = multer({ storage });

module.exports = upload;
