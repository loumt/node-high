var superagent = require('superagent');
var url = require('url');
var path = require('path');
var logger = require('./../utils/logger').system();

var urls= [];
var htmls = [];
const max_url_lenth = 50;

function netThrough(rootUrl){
    if(rootUrl){
        urls.push(rootUrl);
    }else{
        throw new Error('根地址未设置');
    }
}



/**
 * 添加网址
 * @param url
 */
netThrough.prototype.addUrl = (url)=>{
    if(urls.length == max_url_lenth){
        console.log('urls length 已满');
        logger.info('urls length 已满');
        return;
    }
    urls.push(url);
}

netThrough.prototype.getUrls =()=>{
    return urls;
}

urlSize = ()=>{
    return urls.length;
}

netThrough.prototype.getUrl = ()=>{
    if(urlSize() == 0){
        console.log('urls length is 0');
        logger.info('urls length is 0');
        return;
    }

    return urls.pop();
}

var default_options = {
    delay:5000
};


netThrough.prototype.run = (options,callback)=>{
    //配置相关
    var delayTimes = options.delay || default_options.delay;

    //result
    var throghCount = 0; //爬次
    var throghUrl = []; //爬路径

    urls.forEach((url)=>{

        console.log("Now Url:"+url);

        superagent.get(url).end((error,result)=>{
            throghCount++;
            throghUrl.push(url);
            console.log("result:"+result);
        });


    });
}

module.exports = netThrough;

