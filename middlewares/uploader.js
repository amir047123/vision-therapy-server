const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploader = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const supportedImageTypes = /jpeg|jpg|png|webp/;
    const extension = path.extname(file.originalname).toLowerCase();
    if (supportedImageTypes.test(extension.substring(1))) {
      cb(null, true);
    } else {
      cb(new Error("Must be a png/jpg/jpeg image"));
    }
  },
  limits: {
    fileSize: 2000000,
  },
});

module.exports = uploader;
