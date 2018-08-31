const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const createFolder = folder => {
    try {
        fs.accessSync(folder);
    }catch(e){
        fs.mkdirSync(folder);
    }
}

let uploadFolder = './uploads/';
createFolder(uploadFolder);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });
// 处理文件上传
router.post('/', upload.single('avatar'), (req, res, next) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.send({error_code: 0});
});

module.exports =  router;
