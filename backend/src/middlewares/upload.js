const multer = require("multer");

const whitelist = ["image/png", "image/jpeg", "image/jpg"];

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error("File is not allowed"));
    }

    cb(null, true);
  },
});

module.exports = upload;
