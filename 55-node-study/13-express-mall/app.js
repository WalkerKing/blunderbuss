const express = require('express');
const router = require('./router');
const sqlConfig = require('./config').mysql;

const app = new express();
// session 配置
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const options = sqlConfig;
// session持久化
let sessionStore = new MySQLStore(options);
app.use(session({ 
    secret: 'keyboard cat', //随机字符串，作为服务器端生成session的签名
    name: 'session_id', // 保存在本地cookie的一个名字，可以不设置
    resave: false, //强制保存session即使没有变化，默认是true，建议设置为false
    saveUninitialized: true, //强制将未初始化的session存储，默认值是true，建议true
    cookie: {
        secure: false,  // https的情况才可以访问cookie
        maxAge: 4 * 60 * 60 * 1000 //设置session失效时间  4小时
    },
    rolling: true,  //如果用户一直访问浏览器页面，30s没有动作才清楚cookie
    store: sessionStore
}));

// 配置body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 渲染模板使用ejs
app.set('view engine', 'ejs');

// 配置静态文件托管
app.use(express.static('public'));
app.use(express.static('uploads'));

app.use(router);


app.listen('8000', '127.0.0.1');
console.log('app run at http://127.0.0.1:8000');