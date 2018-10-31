// 用户名密码加密
const crypto = require('crypto');
const sha256 = (userName, pwd) => {
    return crypto.createHmac('sha256', userName + 'suijizifuchuan')
        .update(pwd)
        .digest('hex');
}

module.exports = sha256;