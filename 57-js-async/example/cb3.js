let fs = require('fs');
let EventEmitter = require('events');
let eve = new EventEmitter();
let html = {};//存放最终数据

//监听数据获取成功事件，当事件发生之后调用回调函数
eve.on('ready', function (key, value) {
    html[key] = value;
    if (Object.keys(html).length == 2) {
        console.log(html);//在此能够获取到两个文件的数据。
    }
});
fs.readFile('../data/template.txt', 'utf8', function (err, template) {
    //‘ready’为事件名 ，往后是传递给回调函数的参数
    eve.emit('ready', 'template', template);
})
fs.readFile('../data/123.txt', 'utf8', function (err, data) {
    eve.emit('ready', 'data', data);
});