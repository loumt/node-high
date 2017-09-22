/**
 * 对加密模块的测试
 */

var RSAUtil = require('../modules/Encrypt/RSA/RSAUtil').install();
var md5 = require('md5');
/**
 * 测试RSA加密
 * @param req
 * @param res
 * @param next
 */
exports.testRSA = (req,res,next)=>{
    let password = 'cloud1234!@~';
    var passEnd = RSAUtil.encryption(password);
    var passDes = RSAUtil.decryption(passEnd) ;
    res.status(200).json({password:password,encrypt_result:passEnd,decrypt_result:passDes});
}

/**
 * 测试MD5
 * @param req
 * @param res
 * @param next
 */
exports.testMD5 = (req,res,next)=>{
    let password = 'cloud1234~!';
    let encrypt_result = md5(password);
    res.status(200).json({password:password,encrypt_result:encrypt_result});
}