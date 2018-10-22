const express = require('express');
const app = new express();
const cookieParser = require('cookie-parser');

app.use(cookieParser('123'));
app.get('/set', function (req, res) {
    res.cookie('test', '123123123', {maxAge: 100000, signed: true});
    res.send('cookie设置成功');
});


app.get('/', function (req, res) {
    console.log(req.signedCookies);
    res.send(JSON.stringify(req.signedCookies));
});

app.listen(3000, '127.0.0.1')
console.log('sever listen at 127.0.0.1:3000');