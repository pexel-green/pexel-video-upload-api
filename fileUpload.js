// fileUpload.js
const multer = require('multer');
const { fileUploadLimitBytes } = require('./config');


const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const diskUpload = multer({
    storage: diskStorage,
    limits: {
        fileSize: fileUploadLimitBytes,
    },
});

function uploadSingleVideo(req, res, next) {
    diskUpload.single('video')(req, res, err => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                res.status(413).send('File too large');
            } else {
                res.status(400).send('Bad request');
            }
        } else if (err) {
            res.status(500).send(err.message);
        } else {
            next();
        }
    });
}

module.exports = { uploadSingleVideo };