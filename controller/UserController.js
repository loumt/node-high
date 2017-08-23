'use strict'
var uuid = require('uuid');
var async = require('async');
const url = require('url');
var path = require("path");
var logger = require('./../utils/logger').system();
var userService = require('./../services/UserService');


exports.index = (req,res,next)=>{
    res.render('manage/index');
}


/**
 * 用户注册
 * @param req
 * @param res
 * @param next
 */
exports.userRegister = (req, res, next) => {
    let user = {
        userId: uuid.v1(),
        username: req.body.username,
        password: req.body.password,
        disabled: 0,
        ctime: new Date()
    }
    userService.createUser(user, (error, user) => {
        if (error) {
            res.status(200).json({success: false, message: '创建用户失败'});
            return;
        }

        if (user) {
            res.status(200).json({success: true, message: '创建用户成功'});
        }
    })
}


/**
 * 用户列表
 * @param req
 * @param res
 * @param next
 */
exports.userList = (req, res, next) => {
    userService.getUserList((error, users) => {

        if (error) {
            res.status(200).json({success: false, message: '读取用户列表失败'});
            return;
        }

        res.status(200).json({success: true, data: {list: users, size: users.length}});
    });
}


/**
 * 用户禁用
 * @param req
 * @param res
 * @param next
 */
exports.userDisabled = (req, res, next) => {

}

/**
 * 用户注销
 * @param req
 * @param res
 * @param next
 */
exports.userCancel = (req, res, next) => {

}


/**
 * 更新用户信息
 * @param req
 * @param res
 * @param next
 */
exports.userUpdateInfo = (req, res, next) => {

}