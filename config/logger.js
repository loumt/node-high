//v2.0.0+
module.exports = {
    appenders:{
        //控制台输出
        out:{
            type:'console'
        },
        consoleLog:{
            type: 'dateFile',
            filename: 'logs/console-log',
            pattern: '_yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            compress: true
        },
        error:{
            type:'dateFile',
            filename:'logs/error',
            pattern: '_yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        system:{
            type: 'dateFile',
            filename: 'logs/system',
            pattern: '_yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: { appenders: [ 'out' ], level: 'info' },
        system: { appenders: [ 'system' ], level: 'debug' },
        consoleLog: { appenders: [ 'out','consoleLog' ], level: 'info' },
        error: { appenders: [ 'out','error' ], level: 'info' }
    }
}