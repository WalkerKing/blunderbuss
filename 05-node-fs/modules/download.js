const fs = require('fs');
const http = require('http');
const path = require('path');


let url = 'http://audio.xmcdn.com/group48/M02/77/B5/wKgKlVtRPEPwwOJnAILkgAAhjj8819.m4a';


const download = (url, name) => {
    return http.get(url, (res) => {
        console.log(__dirname);
        let myWriteScream = fs.createWriteStream(path.join(__dirname, '../download/jycq.mp3'));
        res.on('data', (chunk) => {
            myWriteScream.write(chunk);
        });
        res.on('end', () => {
            console.log('下载完毕');
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
}


download(url ,'jycq');
