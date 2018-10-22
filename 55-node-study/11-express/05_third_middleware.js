const express = require('express');
const app = new express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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

app.listen(3000, 'localhost');
