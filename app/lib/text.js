var crypto = require('crypto');
var content = 'xyz2fkk'
var md5 = crypto.createHash('md5');
md5.update(content);
var sign = md5.digest('hex');
console.log(sign);
//解密
var verifysign = crypto.createHash('md5').update(content, 'utf8').digest("hex");

//得到verifysign
if (verifysign == sign) {
    console.log("验证成功！");
}
if (verifysign != sign) {
    console.log("验证失败！");
}