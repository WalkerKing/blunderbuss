let fs = require('fs')
fs.readFile('./data/template.txt', 'utf8', function (err, template) {
    fs.readFile('./data/'+template, 'utf8', function (err, data) {
        console.log(data)
    })
})

