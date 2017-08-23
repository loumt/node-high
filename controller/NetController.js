var url = require('url');
var path = require('path');
var logger = require('./../utils/logger').system();
var netThrogh = require('./../utils/ThroughNet');

const netTools = new netThrogh("http://www.baidu.com");


exports.getSize  = (req,res,next)=>{
    netTools.addUrl("www.baid.com");
    netTools.addUrl("www.baid.com");
    netTools.addUrl("www.baid.com");
    netTools.addUrl("www.baid.com");
    netTools.addUrl("www.baid.com");
    netTools.addUrl("www.baid.com");
    var urls =  netTools.getUrls();

    logger.info("Logger Info!!");
    logger.debug("Logger Debug!!");
    logger.warn("Logger Warn!!");
    logger.error("Logger Error!!");


    res.status(200).json({success:true,data:{list:urls,size:urls.length }});
}