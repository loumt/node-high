
var main = require('./../../controller/MainController');

module.exports = (router)=>{
    router.all('/',main.toBlogPage);
}