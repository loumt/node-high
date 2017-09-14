


module.exports = function (data) {
    // Handle message here
    switch (typeof data){
        case 'object':
            this.loggerInfo(`Get message ${data.message}`);
            break;
        default:
            this.loggerInfo('message cant sign!!');
    }
};