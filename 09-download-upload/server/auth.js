const qiniu = require('qiniu')
const key = require('../config')
var mac = new qiniu.auth.digest.Mac(key.accessKey, key.secretKey)
//自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
var options = {
    scope: 'test',
    expires: 7200
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);

console.log(uploadToken)