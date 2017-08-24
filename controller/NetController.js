'use strict'
var url = require('url');
var path = require('path');
var logger = require('./../utils/logger').system();
var ThroughNet = require('./../utils/ThroughNet');

exports.getSize  = (req,res,next)=>{

    let baseUrl = 'http://www.jianshu.com';

    let netTools =  new ThroughNet(baseUrl);

    netTools.run({},(error,message)=>{
        console.log(message);
    });

    res.status(200).json({success:true});
}


