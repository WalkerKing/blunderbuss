const sqlConfig = require('../config').mysql;
// sql配置
const mysql = require('mysql');
let pool = mysql.createPool({
    ...sqlConfig,
    multipleStatements: true  //是否允许执行多条sql语句
});

const excute = function(sql, param){
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject({
                    code: 100,
                    msg: 'sql连接出错',
                    err: err
                });
                return;
            }
            connection.query(sql, param, (error, res) => {
                connection.release();
                if (error) {
                    reject({
                        code: 101,
                        msg: 'sql查询出错',
                        err: error
                    });
                    return;
                }
                resolve(res);
            });
        });
    })
}

module.exports = {
    excute: excute
}
