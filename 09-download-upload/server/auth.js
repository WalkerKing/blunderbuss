const qiniu = require('qiniu')
const key = require('../config')
var mac = new qiniu.auth.digest.Mac(key.accessKey, key.secretKey)
//自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
var options = {
    scope: 'revolver',
    expires: 7200
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);

console.log(uploadToken)


var config = new qiniu.conf.Config();
var bucketManager = new qiniu.rs.BucketManager(mac, config);
var privateBucketDomain = 'http://pjt64qe4x.bkt.clouddn.com';
var deadline = parseInt(Date.now() / 1000) + 3600; // 1小时过期
var privateDownloadUrl = bucketManager.privateDownloadUrl(privateBucketDomain, 'tiger.png', deadline);
console.log(privateDownloadUrl)
