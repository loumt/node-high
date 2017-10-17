/**
 * 用户模块路由
 * @type {any}
 */
var user = require('../../controller/user.controller');


module.exports = (router)=>{
    router.get('/user/index',user.index);
    router.get('/user/list',user.userList);
    router.post('/user/create',user.userRegister);
}