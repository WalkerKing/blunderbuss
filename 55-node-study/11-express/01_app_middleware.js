const express = require('express');
const app = new express();


app.use(function (req, res, next) {
    console.log(new Date());
    next();
});
app.get('/', function (req, res) {
    res.send('hello');
});

app.get('/news', function (req, res) {
    res.send('news');
});

app.listen(3000, 'localhost');