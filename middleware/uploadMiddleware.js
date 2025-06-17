const multer = require('multer');
const path = require('path');
//setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
       cb(null, `${Date.now()}-${file.originalname}`);
    }
});
// file filter to allow only images
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // limit file size to 5MB
    fileFilter
});

module.exports = upload;
