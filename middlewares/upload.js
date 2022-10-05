const multer = require('multer');
const path = require('path');
const short = require('shortid');

const tempDir = path.resolve('./tmp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const [extension] = file.originalname.split('.').reverse();
    cb(null, `${short()}.${extension}`);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 3145728 } });

module.exports = upload;
