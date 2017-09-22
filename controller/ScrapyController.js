'use strict'
var logger = require('./../utils/logger').system();
var ThroughNet = require('./../utils/ThroughNet');
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

    let netTools =  new ThroughNet(baseUrl);

    netTools.run({},(error,message)=>{
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
exports.getDocList = (req,res,next)=>{
    let pageNo  = req.query.pageNo || 1;
    let pageSize = req.query.pageSize || 20;
    docService.getDocByPage(2,2,(error,result)=>{
        if(error){
            res.status(200).json({success:false,message:'获取文章列表失败'});
            return;
        }
        res.status(200).json({success:true,data:result});

    });
}



