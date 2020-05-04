const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFillterImage = (req, file, cb) => {
  console.log(file);
  if (file.mimetype === "image/jpg" || "image/png" || "image/svg") {
    cb(null, true); //save image
  } else {
    cb(null, false); //dont sava
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFillterImage,
  limits: 1024 * 1024 * 5
});

module.exports = upload;
