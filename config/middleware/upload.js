const multer = require("multer");

//Makes Sure that the file being passed is a image
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

//Init storage at Uploades folder
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/public/assets/uploads/");
  },
  //Sets filename with date to make sure there are no Duplicate names
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});

//Sends storage and file filter through mutler
var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;
