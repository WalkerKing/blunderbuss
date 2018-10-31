const express = require('express');
const router = express.Router();
const Mysql = require('../../modules/mysql');
const sha256 = require('../../modules/sha256');

router.get('/', (req, res) => {
    res.render('admin/login');
});

router.post('/doLogin',(req, res) => {
    let param = req.body;
    let password = sha256(param.userName, param.password);
    let querySql = `select * from admin_user where user_name=?`;
    Mysql.excute(querySql, [param.userName]).then(result => {
        let err = null;
        if (result.length === 0) {
            err = {
                code: 102,
                msg: '用户名不存在'
            };
        } else if (password === result[0].password) {
            req.session.userinfo = result[0];
            res.redirect('/admin/product');
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

module.exports = router;