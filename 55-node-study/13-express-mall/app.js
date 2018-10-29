const express = require('express');
const app = new express();
const sqlConfig = require('./config').mysql;
// multer 配置
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

// sql配置
const Mysql = require('./modules/mysql');
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
app.use(express.static('uploads'));
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
                app.locals['userinfo'] = req.session.userinfo
                next()
            } else {
                res.redirect('/login');
            }
    }
});

// 以下为页面路由
app.get('/', (req, res, next) => {
    res.render('product');
    next()
});

// 登录页面
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/doLogin', (req, res) => {
    let param = req.body;
    let password = sha256(param.userName, param.password);
    let querySql = `select * from admin_user where user_name=?`;
    Mysql.excute(querySql, [param.userName]).then(result => {
        let err = null;
        console.log(result.length);
        if (result.length === 0) {
            err = {
                code: 102,
                msg: '用户名不存在'
            };
        } else if (password === result[0].password) {
            req.session.userinfo = result[0];
            res.redirect('/product');
        } else {
            err = {
                code: 103,
                msg: '用户名或密码错误'
            };
        }
        renderErrMsg(err);
    }).catch(err => {
        renderErrMsg(err);
    });
    function renderErrMsg(err) {
        if (err === null) {
            return;
        }
        res.send("<script>alert('" + err.msg + "');location.href='/login'</script>");
    }
});

// 产品列表
app.get('/product', (req, res) => {
    let querySql = `select * from product`;
    Mysql.excute(querySql, {}).then(result => {
        res.render('product', { pList: result });
    })
});

// 产品新增
app.get('/product-add', (req, res) => {
    res.render('product-add');
});

app.post('/doProductAdd', upload.single('pic'), (req, res) => {
    let post = req.body;
    let pic = req.file.filename;
    let sql = 'insert into product set ?';
    post.pic = pic;
    Mysql.excute(sql, post).then(data => {
        res.redirect('/product');
    }).catch(err => {
        console.log(err);
    })
});

// 产品编辑
app.get('/product-edit', (req, res) => {
    let id = req.query.id;
    Mysql.excute('select * from product where id = ?', [id]).then(result => {
        res.render('product-edit', { pInfo: result[0] });
    });
});

// 编辑接口
app.post('/doProductEdit', upload.single('pic'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    let title = req.body.title;
    let price = req.body.price;
    let fee = req.body.fee;
    let description = req.body.description;
    let post = {
        title,
        price,
        fee,
        description
    };
    let sql = 'update product set ? where id = ' + req.body.id;
    if (req.file) {
        post.pic = req.file.filename;
    }
    Mysql.excute(sql, [post]).then(data => {
        res.redirect('/product');
    }).catch(err => {
        console.error(err.err);
    });
});

app.get('/product-delete', (req, res) => {
    Mysql.excute('delete from product where id = ?', [req.query.id]).then(data => {
        res.redirect('/product');
    }).catch(err => {
        console.log(err);
    });
});

// 退出
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