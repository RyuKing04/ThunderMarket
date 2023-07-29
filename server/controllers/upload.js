const multer = require('multer');
const express = require('express');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage })

exports.upload= upload.array('myFile', 5);

module.exports = upload;

