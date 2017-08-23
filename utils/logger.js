'use strict'
var log4js = require('log4js');
var config = require('./../config/logger');

log4js.configure(config);

module.exports = {
    initConfig:function(){
      let consoleLog =  log4js.getLogger('consoleLog');
      let error =  log4js.getLogger('error');
      console.log = consoleLog.info.bind(consoleLog);
      console.error = error.info.bind(error);
    },

    system: function () {
        return log4js.getLogger('system');
    }
};