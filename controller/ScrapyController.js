'use strict'
var logger = require('./../utils/logger').system();
var ScrapyClient = require('./../modules/Scrapy/scrypy.client');
var docService =require('../services/ScrapyService');


/**
 * 爬虫首页
 * @param req
 * @param res
 * @param next
 */
exports.toIndex = (req,res,next)=>{
    res.render('scrapy/index');
}

/**
 * 文章首页
 * @param req
 * @param res
 * @param next
 */
exports.toDocIndex = (req,res,next)=>{
    res.render('scrapy/docList');
}

/**
 * 爬取简书页面
 * @param req
 * @param res
 * @param next
 */
exports.toFollowJianShu  = (req,res,next)=>{

    let baseUrl = 'http://www.jianshu.com';

    let client =  new ScrapyClient(baseUrl);

    client.run({},(error,message)=>{
        console.log(message);
    });

    res.status(200).json({success:true,message:'Task Start....'});
}

/**
 * 获取文章列表
 * @param req
 * @param res
 * @param next
 */
exports.getBook = (req,res,next)=>{
    var _bid = req.query.bid;
    //下一篇
    if(_bid){
        let newBid = _bid + 1  ;
        docService.getDocById(newBid,(error,result)=>{
            if(error){
                res.status(200).json({success:false,message:'获取文章列表失败'});
                return;
            }
            res.status(200).json({success:true,data:result});
        });
    }else{
        docService.getDocByFirst((error,result)=>{
            if(error){
                res.status(200).json({success:false,message:'获取文章列表失败'});
                return;
            }
            res.status(200).json({success:true,data:result});
        });
    }
}



