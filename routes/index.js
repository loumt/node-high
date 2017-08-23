var express = require('express');
var router = express.Router();

var user = require('../controller/UserController');

var net = require('./../controller/NetController');


router.get('/user/index',user.index);
router.get('/user/list',user.userList);
router.post('/user/create',user.userRegister);


router.get('/net/get',net.getSize);

module.exports = router;
