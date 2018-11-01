const Sequelize = require('sequelize');

const connectionUri = require('./config').connectionUri;

const sequelize = new Sequelize(connectionUri, {
    define: {
        timestamps: false // 默认为 true
    }
});


const User = sequelize.define(
    'user',
    {
        'emp_id': {
            'type': Sequelize.CHAR(10), // 字段类型
            'allowNull': false,         // 是否允许为NULL
            'unique': true              // 字段是否UNIQUE
        },
        'nick': {
            'type': Sequelize.CHAR(10),
            'allowNull': false
        },
        'department': {
            'type': Sequelize.STRING(64),
            'allowNull': true
        }
    },
    {
        // 自定义表名
        'freezeTableName': true,
        'tableName': 'user',

        // 是否需要增加createdAt、updatedAt、deletedAt字段
        'timestamps': true,

        // 不需要createdAt字段
        'createdAt': false,

        // 将updatedAt字段改个名
        'updatedAt': 'utime',

        // 将deletedAt字段改名
        // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        'deletedAt': 'dtime',
        'paranoid': true
    }
); // 时间戳默认为 false
// User.sync({ force: true }).then(() => {
//     // 表已创建
    
// }).catch(err => {
//     console.error('创建表失败');
//     console.log(err);
// });
// 方法1：build后对象只存在于内存中，调用save后才操作db
// var user = User.build({
//     'emp_id': '4',
//     'nick': '小红',
//     'department': '技术部'
// });
// user.save().then(ret => {
//     console.log(user.get({'plain': true}));
// });

// 方法2：直接操作db
// User.create({
//     'emp_id': '8',
//     'nick': '小明',
//     'department': '技术部'
// }).then(ret => {
//     console.log(ret.get({'plain': true}));

// });

// 更新
// User.update({department: '商务部'}, {where: {emp_id: 8}}).then(ret => {
//     return User.findAll()
// }).then(users => {
//     // console.log(typeof users);
// })
User.findAll({
    'attributes': [
        'emp_id', ['nick', 'user_nick']
    ],
    where: {
        'id': [1, 2, 3] 
    }
}).then(users => {
    console.log(users.length);
    for(let k of users){
        console.log(k.get({plain: true}));
    }
    
    // a.destroy();  // 软删除
    // a.destroy({force: true}); //硬删除

}).catch(err => {
    console.error('查询表失败');
    console.log(err);
});