'use strict'
const amqp = require('amqp');
const logger = require('./../../utils/logger').rabbitMq();
const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;

const MqConfig = require('./../configs/example.config');
const MqHandler = require('./../handlers/example.handler');

var client = null;

//建立一个缓存机制
var retainTask = [];

var _exchangeReady  = false;
var _queueReady = false;


class MQClient extends EventEmitter{

    //type:类型 0:生产者 1:消费者
    constructor(connConfig = {},handlerFun = MqHandler) {
        super();
        //连接参数
        this.connectParams = {};
        Object.assign(this.connectParams, MqConfig.connInfo, connConfig);

        this._handler = handlerFun;

        this.exchange = null;
        //create conn
        this._connection = amqp.createConnection(this.connectParams, {reconnect: true, defaultExchangeName: MqConfig.messageInfo.exchange.name});
        this._connection.on('error', this.connError.bind(this));
        this._connection.on('connect', this.connReady.bind(this));

        this._connection.on('ready',this.initClient.bind(this));
    }

    connError(){
        this.loggerInfo('Connection Error!!!');
    }
    connReady(){
        this.loggerInfo('Connection Ready!!!');
    }
    initExchange(exc){
        if(exc){
            _exchangeReady = true;
            this.exchange = exc;
        }
    }

    initQueue(queue){
        if(queue){
            _queueReady = true;
        }
        this.queueBindExchange(queue);
        this.createCustomer(queue);
    }

    queueBindExchange(q){
        q.bind(MqConfig.messageInfo.exchange.name, MqConfig.messageInfo.routingKey);
    }

    createCustomer(q,fun){
        // Subscribe to the queue
        q.subscribe(fun);
    }

    initClient(){
        //init exchange
        let exchangeConfig =  {
            type: MqConfig.messageInfo.exchange.type,
            autoDelete: false,
            durable:true //durable:服务器重启不影响MQ内消息
        };
        let queueConfig ={
            autoDelete: false,
            durable: true
        };

        this._connection.exchange(MqConfig.messageInfo.exchange.name,exchangeConfig, this.initExchange.bind(this));
        //init queue
        this._connection.queue(MqConfig.messageInfo.queueName, queueConfig, this.initQueue.bind(this));

    }

    loggerInfo(msg){
        logger.info(`${this.connectParams.host} :`+ msg);
    }

    //send message
    sendMsg(sendData){
        //validate useful
        if(_exchangeReady && _queueReady){
            this.exchange.publish( MqConfig.messageInfo.routingKey,
                sendData,
                {routingKey: MqConfig.messageInfo.routingKey, exchange: MqConfig.messageInfo.exchange.name},
                function (isSuccess, error) {
                    if (isSuccess) {
                        console.log(`[MQ PUBLISH MESSAGE]:{success:${isSuccess},msg:${JSON.stringify(sendData)}`);
                    } else {
                        console.log(`[ERROR PUBLISH MSG]: ${error.message}`);
                    }
                });
        }else{
            //Un use
            retainTask.push(sendData);
        }
    }


    //publisher or customer
    static  getInstance(){
        //return
        if(client == null){
            client = new MQClient();
        }
        return client;
    }

    //reset client
    static clear(){
        client = null;
    }
}

var mq = new MQClient();

setInterval(function(){
    mq.sendMsg({message:'15614616'})
},2000);








