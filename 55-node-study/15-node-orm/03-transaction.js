const config = require('../config').mysql;
const sha256 = require('../modules/sha256');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    // 请参考 Querying - 查询 操作符 章节
    operatorsAliases: false
});

const User = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    avatar: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    enable: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
}, {
        // 不删除数据库条目，但将新添加的属性deletedAt设置为当前日期（删除完成时）。 
        // paranoid 只有在启用时间戳时才能工作
        paranoid: true,
        // 禁用修改表名; 默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数。 如果你不想这样，请设置以下内容
        freezeTableName: true,
    });
// 使用 .build() 创建的实例需要显式的 .save() 调用来存储到 database
// const user = User.build({
//     username: 'Thomas',
//     password: sha256('Thomas', '1231212')
// });

// user.save().then(ret => {
//     console.log(ret.get())

// })
// User.create({
//     username: 'Bob',
//     password: sha256('Bob', '1231212')
// }).then(user => {
//     console.log(user.get())
// })
sequelize.transaction(function (t) {

    // 在这里链接您的所有查询。 确保你返回他们。
    return User.create({
        username: 'BobKing1',
        password: sha256('BobKing', '1231212')
    }, { transaction: t }).then(function (user) {
        console.log(`刚被插入的数据为${JSON.stringify(user)}`);
        return User.create({
            username: 'BobKing1',
            password: sha256('BobKing', '1231212')
        }, { transaction: t });
    });

}).then(function (result) {
    console.log(`事务操作执行成功`);
    console.log(result);
    // 事务已被提交
    // result 是 promise 链返回到事务回调的结果
}).catch(function (err) {
    console.log('事务已经被回滚');
    console.log(err.message);

    // 事务已被回滚
    // err 是拒绝 promise 链返回到事务回调的错误
})

module.exports = {
    create(username, password, role, enable) {
        return User.create({
            username: username,
            password: password,
            role: role,
            enable: enable
        })
    },
    // 根据用户名获取一条
    getUserByName(username) {
        return User.findOne({
            // attributes: ['username', 'password', ['role', 'level']],
            where: {
                username
            }
        })
    },
    // 按照给定条件，获取多条数据
    getSomeUsers(opt) {
        return User.findAll(opt)
    },
    updateUser() {

    }
};