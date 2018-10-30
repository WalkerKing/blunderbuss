const express = require('express');
const router = express.Router();
const login = require('./login');
let i = 1;
// 拦截器
// router.use((req, res, next) => {
//     console.log(i++);
//     console.log(req.url);
//     switch (req.url) {
//         case '/login':
//         case '/doLogin':
//             next()
//             break;
//         default:
//             //根据session内容判断是否登录
//             if (req.session.userinfo && req.session.userinfo.user_name !== '') {
//                 req.app.locals['userinfo'] = req.session.userinfo
//                 next()
//             } else {
//                 res.redirect('/admin/login');
//             }
//     }
// });

router.get('/', (req, res) => {
    res.send('admin');
});

router.use('/login', login);
router.get('/product', (req, res) => {
    res.send('product');
});
router.get('/product/add', (req, res) => {
    res.send('/product/add');
});
router.get('/product/edit', (req, res) => {
    res.send('/product/edit');
});
module.exports = router;