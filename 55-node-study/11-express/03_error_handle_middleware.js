const express = require('express');
const app = new express();


app.get('/', function (req, res) {
    res.send('hello express');
});

app.get('/news', function (req, res, next) {
    console.log('news');
    next();
});

app.get('/news', function (req, res) {
    res.send('news');
});

app.use(function (req, res){
    res.status(404).send('页面找不到');
})
app.listen(3000, 'localhost');
