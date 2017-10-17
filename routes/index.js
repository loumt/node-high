var express = require('express');
var router = express.Router();

var main = require('./modules/main');
var user = require('./modules/user');
var scrapy = require('./modules/scrapy');

main(router);
//用户模块
user(router);
//爬虫模块
scrapy(router);



module.exports = router;
