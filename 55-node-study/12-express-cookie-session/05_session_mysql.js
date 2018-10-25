const express = require('express');
const app = new express();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'MyNewPass@234',
    database: 'hb'
};

let sessionStore = new MySQLStore(options);
app.use(session({
    secret: 'keyboard cat', //随机字符串，作为服务器端生成session的签名
    name: 'session_id', // 保存在本地cookie的一个名字，可以不设置
    resave: false, //强制保存session即使没有变化，默认是true，建议设置为false
    saveUninitialized: true, //强制将未初始化的session存储，默认值是true，建议true
    cookie: {
        secure: false,  // https的情况才可以访问cookie
        maxAge: 30 * 60 * 1000 //设置session失效时间
    },
    rolling: true,  //如果用户一直访问浏览器页面，30s没有动作才清楚cookie
    store: sessionStore
}));

app.get('/', function (req, res) {
    if(req.session.userinfo){
        res.send(req.session.userinfo);
    }else{
        res.send('请您登录');
    }
});

app.get('/login', function (req, res) {
    req.session.userinfo = 'shanghai';
    res.send('登录成功');
});

app.get('/logout', function (req, res) {
    // req.session.userinfo.maxAge = 0; // 设置cookie过期时间为0，来清除session
    req.session.destroy(function () {
        console.log('退出登录成功');
    });
    res.send('退出登录成功');
});

app.listen(3000, '127.0.0.1');
console.log('Server run at http://127.0.0.1:3000');

