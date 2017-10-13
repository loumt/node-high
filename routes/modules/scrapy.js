/**
 * 爬虫模块路由
 * @type {any}
 */
var scrapy = require('./../../controller/ScrapyController');


module.exports = (router)=>{
    router.get('/scrapy/index',scrapy.toIndex);
    router.get('/scrapy/docIndex',scrapy.toDocIndex);
    router.get('/scrapy/toFollow',scrapy.toFollowJianShu);
    router.get('/scrapy/getBook',scrapy.getBook);
}