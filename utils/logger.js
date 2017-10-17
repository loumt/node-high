'use strict'
var log4js = require('log4js');
var config = require('./../config/logger');

log4js.configure(config);

module.exports = {
    system: function () {
        return log4js.getLogger('system');
    }
};