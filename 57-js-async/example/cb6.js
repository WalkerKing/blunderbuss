let fs = require('fs');
function readFile(filename) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}

async function read() {
    let template = await readFile('../data/template.txt');
    let data = await readFile('../data/123.txt');
    return template + '+' + data;
}
let result = read();
result.then(data => console.log(data));