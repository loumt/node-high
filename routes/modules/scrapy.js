/**
 * 爬虫模块路由
 * @type {any}
 */
var scrapy = require('./../../controller/ScrapyController');


module.exports = (router)=>{
    router.get('/net/index',scrapy.toIndex);
    router.get('/net/docIndex',scrapy.toDocIndex);
    router.get('/net/toFollow',scrapy.toFollowJianShu);
    router.get('/net/getDocList',scrapy.getDocList);
}