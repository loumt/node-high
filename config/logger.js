//v2.0.0+
// var dir = '/root/logs/node-high';
var dir = 'D:/node-high';

//defined a layout by myself
// log4js.addLayout('json', function(config) {
//     return function(logEvent) { return JSON.stringify(logEvent) + config.separator; }
// });

module.exports = {
    appenders:{
        //控制台输出
        out:{
            type:'console'
        },
        consoleLog:{
            type: 'dateFile',
            filename: dir+'/console',
            pattern: '_yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            //compress: true,
            layout:{type:'basic'},
            encoding:'utf-8',
            daysToKeep:15
        },
        error:{
            type:'dateFile',
            filename:dir+'/error',
            pattern: '_yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            layout:{type:'basic'},
            encoding:'utf-8',
            daysToKeep:15
        },
        system:{
            type: 'dateFile',
            filename: dir+'/system',
            pattern: '_yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            layout:{type:'basic'},
            encoding:'utf-8',
            daysToKeep:15
        },
        rabbitMq:{
            type: 'dateFile',
            filename: dir+'/rabbit-mq',
            pattern: '_yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            layout:{type:'basic'},
            encoding:'utf-8',
            daysToKeep:15
        }
    },
    categories: {
        default: { appenders: [ 'out' ], level: 'info' },
        system: { appenders: [ 'system' ], level: 'debug' },
        consoleLog: { appenders: [ 'out','consoleLog' ], level: 'info' },
        error: { appenders: [ 'out','error' ], level: 'info' },
        rabbitMq:{ appenders: [ 'out','rabbitMq' ], level: 'info' }
    }
}