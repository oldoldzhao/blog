const express = require('express');
const router = express.Router();
const article = require('./article');
const imgUp = require('./imgUp');
const user = require('./user');

// //设置跨域访问
router.all('*', function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By",' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");
    // res.header("Access-Control-Allow-Credentials", true);
    // next();

    //     header信息 Access-Control-Allow-Credentials:true
    // Access-Control-Allow-Origin不可以为 '*'，因为 '*' 会和 Access-Control-Allow-Credentials:true 冲突，需配置指定的地址
    if( req.headers.origin == 'http://localhost:8081' || req.headers.origin == 'http://localhost:8080' ){ 
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        // res.header("Access-Control-Allow-Origin", "*");
        //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Content-Type', 'application/json;charset=utf-8');
        res.header("Access-Control-Allow-Credentials", true);
    }
    
    next();
});

router.use('/article', article);
router.use('/imgUp', imgUp);
router.use('/user', user);

module.exports = router;