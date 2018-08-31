const express = require('express');
const bodyParser = require('body-parser');


const ejs = require('ejs');
const app = express();

const indexRouter = require('./routes/index')
const formRouter = require('./routes/form')
const uploadRouter = require('./routes/upload')

app.set('view engine', 'ejs');

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({extended: false});

// hello world
app.use('/', indexRouter);
app.use('/form', formRouter);
app.use('/upload', uploadRouter);


// 模板公用
app.get('/about', (req, res, next) => {
    // let form = fs.readFileSync('./form.html', {encoding: 'utf8'});
    // res.send(form);
    // res.sendFile(__dirname + '/form.html');
    
    // let person = req.params.name;
    res.render('about')
});



// 处理get请求
app.get('/get', (req, res, next) => {
    console.log(req.query);
    res.send('GET request and query string is: ' + JSON.stringify(req.query));
});

// 处理post请求 json格式
app.post('/post', jsonParser, (req, res, next) => {
    res.send(req.body);
});

// 处理post请求 urlencode 格式
app.post('/post/url', urlencodedParser, (req, res, next) => {
    res.send(req.body);
});

app.listen('3000')

console.log('Server run at http://localhost:3000');
