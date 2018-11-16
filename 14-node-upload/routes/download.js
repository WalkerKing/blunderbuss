const fs = require('fs');
const http = require('http');
const path = require('path');


const download = (url, name) => {
    return new Promise(function (resolve, reject) {
        http.get(url, (res) => {
            console.log(__dirname);
            var html = '';
            let myWriteScream = fs.createWriteStream(path.join(__dirname, '../download/'+name));
            res.on('data', (chunk) => {
                html += chunk;
                myWriteScream.write(chunk);
            });
            res.on('end', () => {
                console.log('下载完毕');
                resolve(html)
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
            reject(e);
        });
    })
}

module.exports = download