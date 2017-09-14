var express = require('express');
var router = express.Router();

var user = require('../controller/UserController');

var net = require('./../controller/NetController');

var read = require('./../controller/ReadController');
var cryptoC = require('./../controller/CryptoController');

const test = require('./../controller/TestController');

router.get('/user/index',user.index);
router.get('/user/list',user.userList);
router.post('/user/create',user.userRegister);


router.get('/net/index',net.toIndex);
router.get('/net/docIndex',net.toDocIndex);
router.get('/net/toFollow',net.toFollowJianShu);
router.get('/net/getDocList',net.getDocList);

router.get('/office/getXlsx',read.readXlsx);

//crypto
router.post('/crypto',cryptoC.testRSA);


//test
router.get('/test/testPage',test.toTestPage);

router.post('/test/crypto',test.cryptoTest);



module.exports = router;
