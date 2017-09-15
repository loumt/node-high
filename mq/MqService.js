'use strict'
const amqp = require('amqp');
const logger = require('../utils/logger').rabbitMq();
const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;

const MqConfig = {
    connInfo: {
        host: "192.168.3.17",
        port: 5672,
        login: 'guest',
        password: 'guest'
    },
    messageInfo: {
        routingKey: 'test.routing.key',
        bindKey: 'test.routing.key',
        exchange: {
            type: 'topic',
            name: 'test.amqp.exchange'
        },
        queueName: 'test.amqp.queue'
    }
}

var client = null;

//建立一个缓存机制
var retainTask = [];

class MQClient extends EventEmitter {
    constructor(connConfig = {}) {
        super();
        //连接参数
        this.connectParams = {};
        Object.assign(this.connectParams, MqConfig.connInfo, connConfig);

        this._exchange = null;
        this._queue = null;
        //create conn
        this._connection = amqp.createConnection(this.connectParams, {
            reconnect: true,
            defaultExchangeName: MqConfig.messageInfo.exchange.name
        });
        this._connection.on('error', this.connError.bind(this));
        this._connection.on('connect', this.connReady.bind(this));

        this._connection.on('ready', this.initClient.bind(this));
    }

    connError() {
        this.loggerInfo('Connection Error!!!');
    }
    connReady() {
        this.loggerInfo('Connection Ready!!!');
    }

    initExchange(exc) {
        this._exchange = exc;
        this.loggerInfo('Exchange Init OK')
    }

    initQueue(queue) {
        this._queue = queue;
        this.queueBindExchange(queue);
        this.createCustomer(queue);
        this.loggerInfo('Queue Init OK')
    }
    bindInfo(){
        this.loggerInfo('Queue Bind Exchange OK');
    }

    queueBindExchange(q) {
        q.bind(MqConfig.messageInfo.exchange.name, MqConfig.messageInfo.bindKey,this.bindInfo.bind(this));
    }

    createCustomer(q,custFunc) {
        // Subscribe to the queue
        q.subscribe(function (data) {
                // Handle message here
                switch (typeof data) {
                    case 'object':
                        console.log(`Get message ${data.message}`);
                        break;
                    default:
                        console.log('message cant sign!!');
                }
            }
        );
    }

    initClient() {
        //init exchange
        let exchangeConfig = {
            type: MqConfig.messageInfo.exchange.type,
            autoDelete: false,
            durable: true //durable:服务器重启不影响MQ内消息
        };
        let queueConfig = {
            autoDelete: false,
            durable: true
        };

        this._connection.exchange(MqConfig.messageInfo.exchange.name, exchangeConfig, this.initExchange.bind(this));
        //init queue
        this._connection.queue(MqConfig.messageInfo.queueName, queueConfig, this.initQueue.bind(this));

    }

    loggerInfo(msg) {
        logger.info(`[MQ]_${this.connectParams.host} : ${msg}`);
    }

    //send message
    sendMsg(sendData) {
        //validate useful
        if (this._exchange && this._queue) {
            this._exchange.publish(MqConfig.messageInfo.routingKey, sendData, {exchange: MqConfig.messageInfo.exchange.name},this.sendReact.bind(this));
        } else {
            retainTask.push(sendData);
        }
    }

    sendReact(isSuccess,error){
        if (isSuccess) {
            this.loggerInfo(`MSG PUBLISHED SUCCESS`);
        } else {
            this.loggerInfo(`MSG PUBLISHED FALSE:${error}`);
        }
    }

    //Close Conn
    disConnection() {
        this._connection.disconnect();
    }

    static  getInstance() {
        //return
        if (client == null) {
            client = new MQClient();
        }
        return client;
    }

    //reset client
    static clear() {
        client.disconnect();
        client = null;
    }
}

module.exports = MQClient;

// var mq = new MQClient();
//
// setInterval(function () {
//     mq.sendMsg({message: 'ssssssss'})
// }, 2000);







