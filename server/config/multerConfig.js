const multer = require("multer");
const path = require("path");
const fs = require("fs");
// const cloudinary = require("cloudinary").v2;
// const cloudinaryStorage = require("cloudinary-multer");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_URL,
//   api_key: process.env.CLOUDINARY_API_SECRET,
//   api_secret: CLOUDINARY_API_KEY,
// });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = `./public/uploads`;
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, (error) => cb(error, dir));
      }
      return cb(null, dir);
    });
  },

  filename: (req, file, cb) => {
    // console.log(file.fieldname, file.originalname);
    // console.log(
    //   "name: ",
    //   Date.now().toString() + path.extname(file.originalname)
    // );
    console.log(file);
    cb(null, file.originalname);
  },
});
// const storage = cloudinaryStorage({
//   cloudinary: cloudinary,
// });

const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) return cb(null, true);

  cb("Error: Images Only!");
}

// router.get('/upBy/:peroiod',async )

module.exports = upload;
