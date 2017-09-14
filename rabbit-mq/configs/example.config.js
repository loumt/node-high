module.exports = {
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