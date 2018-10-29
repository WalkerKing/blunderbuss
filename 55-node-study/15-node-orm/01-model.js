const mysqlConf = require('./config').mysql;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(mysqlConf.database, mysqlConf.user, mysqlConf.password, {
    host: mysqlConf.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    // 仅限 SQLite
    storage: 'path/to/database.sqlite',
});

// 或者你可以简单地使用 uri 连接
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});

// force: true 如果表已经存在，将会丢弃表
User.sync({ force: true }).then(() => {
    // 表已创建
    return User.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
}).catch(err => {
    console.error('创建表失败');
    console.log(err);
});
// 应用全局的模型参数
// Sequelize 构造函数使用 define 参数，该参数将用作所有定义模型的默认参数。


User.findAll().then(users => {
    console.log(users);
}).catch(err => {
    console.error('查询表失败');
    console.log(err);
});