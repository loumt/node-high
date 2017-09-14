'use strict'
const amqp = require('amqp');
const logger = require('../../utils/logger').system();
const _ = require('lodash');

const MqConfig = {
    connInfo: {
        host: "192.168.3.17",
        port: 5672,
        login: 'guest',
        password: 'guest'
    },
    messageInfo: {
        routingKey: 'test.routing.key',
        bindKey: 'test.bind.key',
        exchange: {
            type: 'topic',
            name: 'test.amqp.exchange'
        },
        queueName: 'test.amqp.queue'
    }
}

var _fn = function(data){
    // Handle message here
    switch (typeof data){
        case 'object':
            loggerInfo(`Get message ${data.message}`);
            break;
        default:
            loggerInfo('message cant sign!!');
    }
}
var data =  {message:'这是一首唱不完的歌!!!!',status:5000};



var _exchange = null;
var _queue = null;
var _connection =null;

function loggerInfo(msg) {
    logger.info(`#RabbitMQ Info# ${msg}`);
}

_connection = amqp.createConnection(MqConfig.connInfo, {
    reconnect: true,
    defaultExchangeName: MqConfig.messageInfo.exchange.name
});

_connection.on('error', function (e) {
    loggerInfo('create connection error:' + e);
});

_connection.on('connect', function () {
    loggerInfo('RabbitMQ ready to connect!');
});


// Initialize the exchange, queue and subscription
_connection.on('ready', function () {
    loggerInfo('Rabbit connect!!');

    //a exchange will be create
    _exchange = _connection.exchange(MqConfig.messageInfo.exchange.name, {
        type: MqConfig.messageInfo.exchange.type,
        autoDelete: false,
        durable:true //durable:服务器重启不影响MQ内消息
    });

    //validate exchange is available
    if (!_exchange) {
        loggerInfo('exchange create error!!!!');
    }

    _queue = _connection.queue(MqConfig.messageInfo.queueName, {autoDelete: false, durable: true}, function (queue) {

        //validate queue is available
        if (!_queue) {
            loggerInfo('queue create error!!!!');
        }

        // Bind to the exchange
        _queue.bind(MqConfig.messageInfo.exchange.name, MqConfig.messageInfo.routingKey);

        // Subscribe to the queue
        // set Receive Function
        _queue.subscribe(_fn);

    });

});


setInterval(function(){
    _exchange.publish(
        MqConfig.messageInfo.routingKey,
       data,
        {routingKey: MqConfig.messageInfo.routingKey, exchange: MqConfig.messageInfo.exchange.name},
        function (isSuccess, error) {
            if (isSuccess) {
                loggerInfo('publish OK!!!!');
            } else {
                loggerInfo(`[ERROR PUBLISH MSG]: ${error.message}`);
            }
        }
    );
},3000);