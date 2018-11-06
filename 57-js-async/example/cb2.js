//回调金字塔，又叫回调地狱。
//它使js代码变的非常难看和难以维护并且效率低下。 
let fs = require('fs')
fs.readFile('./data/template.txt', 'utf8', function (err, template) {
    fs.readFile('./data/data.txt', 'utf8', function (err, data) {
        fs.readFile('./data/data2.txt', 'utf8', function (err, data1) {
            fs.readFile('./data/data3.txt', 'utf8', function (err, data2) {
                fs.readFile('./data/data4.txt', 'utf8', function (err, data3) {
                    console.log(template + ' ' + data + ' ' + data1 + ' ' + data2 + ' ' + data3);
                })
            })
        })
    })
})