'use strict'
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const dbconfig = require('./../config/mysql.config');

var sequelize = new Sequelize(
    dbconfig.db, // 数据库名
    dbconfig.username, // 用户名
    dbconfig.password, // 用户密码
    {
        'dialect': dbconfig.dialect, // 数据库使用mysql
        'host': dbconfig.host,
        'port': dbconfig.port// 数据库服务器端口
    }
);

var db = {};
fs.readdirSync(path.join(__dirname, 'pojos'))
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, 'pojos', file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;