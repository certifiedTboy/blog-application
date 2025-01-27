const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images");
  },

  filename: (req, file, callback) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    callback(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (req, file, callback) => {
  let ext = path.extname(file.originalname);

  if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
    callback(new Error("invalid file format"));
  }

  callback(null, true);
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
