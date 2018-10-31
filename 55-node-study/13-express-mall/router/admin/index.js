const express = require('express');
const router = express.Router();
const Mysql = require('../../modules/mysql')
const login = require('./login');
// multer 配置
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
// 拦截器
router.use((req, res, next) => {
    switch (req.url) {
        case '/login':
        case '/doLogin':
            next();
            break;
        default:
            //根据session内容判断是否登录
            if (req.session.userinfo && req.session.userinfo.user_name !== '') {
                req.app.locals['userinfo'] = req.session.userinfo
                next();
            } else {
                res.redirect('/admin/login');
            }
    }
});

router.get('/', (req, res) => {
    res.send('admin');
});

router.use('/login', login);
router.get('/product', (req, res) => {
    let querySql = `select * from product`;
    Mysql.excute(querySql, {}).then(result => {
        res.render('admin/product/index', { pList: result });
    });
});
router.get('/product/add', (req, res) => {
    res.render('admin/product/add');
});
router.post('/product/doAdd', upload.single('pic'), (req, res) => {
    let post = req.body;
    let pic = req.file.filename;
    let sql = 'insert into product set ?';
    post.pic = '/' + pic;
    Mysql.excute(sql, post).then(data => {
        res.redirect('/admin/product');
    }).catch(err => {
        console.log(err);
    })
});
router.get('/product/edit', (req, res) => {
    let id = req.query.id;
    Mysql.excute('select * from product where id = ?', [id]).then(result => {
        res.render('admin/product/edit', { pInfo: result[0] });
    });
});
router.post('/product/doEdit', upload.single('pic'), (req, res) => {
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
        post.pic = '/' + req.file.filename;
    }
    Mysql.excute(sql, [post]).then(data => {
        res.redirect('/admin/product');
    }).catch(err => {
        console.error(err.err);
    });
});

router.get('/product/delete', (req, res) => {
    Mysql.excute('delete from product where id = ?', [req.query.id]).then(data => {
        res.redirect('/admin/product');
    }).catch(err => {
        console.log(err);
    });
});
module.exports = router;