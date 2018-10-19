const download = require('./download')
// console.log(download)
download('http://www.baidu.com','baidu').then(data => {
    return data;
}).then(data => {
    console.log(data)
});
