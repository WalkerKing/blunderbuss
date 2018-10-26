const express = require('express');
const app = new express();
const sqlConfig = require('./config').mysql;
// sql配置
const mysql = require('mysql');
let pool = mysql.createPool({
    ...sqlConfig,
    multipleStatements: true  //是否允许执行多条sql语句
});
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
// 用户名密码加密
const crypto = require('crypto');
const sha256 = (userName, pwd) => {
    return crypto.createHmac('sha256', userName + 'suijizifuchuan')
        .update(pwd)
        .digest('hex');
}
// 配置body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
// 渲染模板使用ejs
app.set('view engine', 'ejs');

// 返回参数封装
class ResMsg {
    constructor(res) {
        this.data = res.data;
        this.code = res.code || 200;
        this.msg = res.msg || '成功';
    }
}

// 拦截器功能
app.use((req, res, next) => {
    switch (req.url) {
        case '/login':
        case '/doLogin':
            next()
            break;
        default:
            //根据session内容判断是否登录
            if (req.session.userinfo && req.session.userinfo.user_name !== '') {
                app.locals['userinfo']=req.session.userinfo
                next()
            } else {
                res.redirect('/login');
            }
    }
});

// 以下为页面路由
app.get('/', (req, res, next) => {
    res.render('/product');
    next()
});

// 登录页面
app.get('/login', (req, res) => {
    res.render('login');
});

// 获取登录数据
const doLogin = (userName, password) => {
    return new Promise((resolve, reject) => {
        let querySql = `select * from admin_user where user_name='${userName}'`;
        pool.getConnection((err, connection) => {
            if (err) {
                reject({
                    code: 104,
                    msg: 'sql连接出错',
                    err: err
                });
                return;
            }
            connection.query(querySql, { userName: userName }, (error, res) => {
                connection.release();
                if (error) {
                    reject({
                        code: 101,
                        msg: 'sql查询出错',
                        err: err
                    });
                    return;
                }
                if (res.length === 0) {
                    reject({
                        code: 102,
                        msg: '用户名不存在'
                    });
                }
                if (password === res[0].password) {
                    resolve(res);
                } else {
                    reject({
                        code: 103,
                        msg: '用户名或密码错误'
                    });
                }
            });
        });
    })
}

app.post('/doLogin', (req, res) => {
    let param = req.body;
    let password = sha256(param.userName, param.password);
    doLogin(param.userName, password).then(data => {
        req.session.userinfo = data[0];
        res.redirect('/product');
    }).catch(err => {
        res.send("<script>alert('" + err.msg + "');location.href='/login'</script>");
        console.log(err);
    })
});

// 产品列表
app.get('/product', (req, res) => {
    getProductList().then(data => {
        res.render('product', { pList: data });
    })
});

const getProductList = () => {
    return new Promise((resolve, reject) => {
        let querySql = `select * from product`;
        pool.getConnection((err, connection) => {
            if (err) {
                reject({
                    code: 104,
                    msg: 'sql连接出错',
                    err: err
                });
                return;
            }
            connection.query(querySql, {}, (error, result) => {
                connection.release();
                result = JSON.stringify(result);
                let data = JSON.parse(result);
                if (error) {
                    reject({
                        code: 101,
                        msg: 'sql查询出错',
                        err: err
                    });
                    return;
                }
                resolve(data);
            });
        });
    })
}

// 产品新增
app.get('/product_add', (req, res) => {
    res.render('product_add');
});

// 产品编辑
app.get('/product_edit', (req, res) => {
    res.render('product_edit');
});

// 产品编辑
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login');
        }
    })
});

app.listen('8000', '127.0.0.1');
console.log('app run at http://127.0.0.1:8000');