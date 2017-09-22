/**
 * 加密模块路由
 * @type {any}
 */
var crypto = require('./../../controller/CryptoController');


module.exports = (router)=>{
    router.post('/crypto/rsa',crypto.testRSA);
    router.post('/crypto/md5',crypto.testMD5);
}