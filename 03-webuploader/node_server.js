const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');


app.use(express.static(path.join(__dirname, '/webuploader-master')));
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
app.post('/', upload.single('file'), (req, res, next) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.send({error_code: 0});
});
app.get('/', (req, res) => {
    res.sendFile('/webuploader-master/index.html');
});
app.listen('3000');
console.log('Server run at http://localhost:3000');
