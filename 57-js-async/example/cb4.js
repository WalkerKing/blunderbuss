// 不使用回调的情况
let fs = require('fs');
function render(length, cb) {
    let html = {};
    return function (key, value) {
        html[key] = value;
        if (Object.keys(html).length == length) {
            cb(html);
        }
    }
}
//2是一个哨兵变量，将读取文件数据成功后执行的方法作为回调函数传给render方法。
let done = render(2, function (html) {
    console.log(html);
})
fs.readFile('../data/template.txt', 'utf8', function (err, template) {
    done('template', template);
})
fs.readFile('../data/123.txt', 'utf8', function (err, data) {
    done('data', data);
})