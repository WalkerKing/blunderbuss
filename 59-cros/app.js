var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var xmlparser = require('express-xml-bodyparser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(xmlparser());
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api', function (req, res) {
    res.cookie('testcookie', Math.random(), { maxAge: 900000 })
    res.render('./index.jade', { title: 'this page' })
})
app.get('/api/cros/simple', function (req, res) {
    const query = req.query
    console.log(query)
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.send(JSON.stringify({ name: query.name, age: query.age }))

})
app.get('/api/cros/addAllowOrigin', function (req, res) {
    const query = req.query
    console.log('query', query)
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Credentials', true)
    // res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    console.log('cookie', req.cookies)
    res.send(JSON.stringify({ name: query.name, age: query.age, cookie: req.cookies}))

})
app.options('*', function (req, res) {
    console.log('Receive a option request')
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Max-Age", 1728000);
    res.sendStatus(200)
})
app.put('/api/cros/put', function (req, res) {
    console.log('icoming...')
    // res.send('PUT request to homepage')
    const query = req.query
    console.log('query', query)
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    console.log('cookie', req.cookies)
    res.send(JSON.stringify({ name: query.name, age: query.age, cookie: req.cookies}))

})
app.get('/api/jsonp', function (req, res, next) {
    const query = req.query
    console.log(query)
    let cb = query.jsonpcbname || query.callback
    // 设置一个cookies
    res.cookie('tokenId', '1')
    // query.cb是前后端约定的方法名字，其实就是后端返回一个直接执行的方法给前端，由于前端是用script标签发起的请求，所以返回了这个方法后相当于立马执行，并且把要返回的数据放在方法的参数里。
    res.send(`${cb}(${JSON.stringify({ msg: query.msg })})`)
});
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
