let fs = require('fs')
let co = require('co')
function readFile(filename) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}
function* read() {
    let template = yield readFile('../data/template.txt');
    let data = yield readFile('../data/123.txt');
    return template + '+' + data;
}
co(read).then(function (data) {
    console.log(data);
}, function (err) {
    console.log(err);
});