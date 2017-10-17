
var main = require('../../controller/main.controller');

module.exports = (router)=>{
    router.all('/',main.toBlogPage);
}