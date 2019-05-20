const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.post('/login', (req,res) => {
    let resData = {};
    const account = req.body.account;
    const password = req.body.password;

    User.findOne({
        account,
        password
    }).then(data => {
        if(data && data._id) {
            res.cookie('userInfo', JSON.stringify(data), {sign: true, maxAge: 1000 * 60 * 60 * 4})
            resData.ret = 1;
            resData.msg = "ok";
        }else {
            resData.ret = 0;
            resData.msg = "账号或密码错误";
        }

        res.json(resData);
    })
})

router.post('/register', (req, res) => {
    let resData = {};
    const account = req.body.account;
    const password = req.body.password;
    const repassword = req.body.repassword;

    User.findOne({
        account
    }).then(data => {
        if(data && data._id) {
            resData.ret = 0;
            resData.msg = "账号已存在！"

            res.json(resData);
        } else {
            resData.ret = 1;
            resData.msg = "ok";

            User.create({
                account,
                password,
                repassword
            }).then(response => {
                res.cookie('userInfo', JSON.stringify(response), {sign: true, maxAge: 1000 * 60 * 60 * 4})
    
                res.json(resData);
            })
        }
    })
})

router.post('/modPwd', (req, res) => {
    const _id = req.body.id;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    let resData = {};

    User.findOne({
        _id,
        password: oldPassword
    }).then(data => {
       if(data && data._id) {
            User.updateOne({
                _id
            },{
                password: newPassword  
            }).then(response => {
                if(response.ok == 1) {
                    resData.ret = 1;
                    resData.msg = "ok";
                }else {
                    resData.ret = 0;
                    resData.msg = "修改失败";
                }

                res.json(resData);
            })
       } else {
           resData.ret = 0;
           resData.msg = "密码错误！";

           res.json(resData);
       }
    })
})

router.post('/modName', (req, res) => {
    const _id = req.body.id;
    const account = req.body.account;
    let resData = {};

    User.updateOne({
        _id
    },{
        account 
    }).then(response => {
        if(response.ok == 1) {
            resData.ret = 1;
            resData.msg = "ok";

            User.findOne({
                _id
            }).then( response => {
                res.cookie('userInfo', JSON.stringify(response), {sign: true, maxAge: 1000 * 60 * 60 * 4})
                res.json(resData);
            })
        }else {
            resData.ret = 0;
            resData.msg = "修改失败";
            res.json(resData);
        }
    })
})

router.post('/logout', (req, res) => {
    let resData = {};

    resData.ret = 1;
    resData.msg = "ok";
    res.clearCookie('userInfo');
    res.json(resData);
})

router.post('/modImg', (req, res) => {
    const _id = req.body.id;
    const imgId = req.body.imgId;
    let resData = {};

    User.updateOne({
        _id
    },{
        imgId 
    }).then(response => {
        if(response.ok == 1) {
            resData.ret = 1;
            resData.msg = "ok";
            resData.imgId = imgId;

            User.findOne({
                _id
            }).then( response => {
                res.cookie('userInfo', JSON.stringify(response), {sign: true, maxAge: 1000 * 60 * 60 * 4})
                res.json(resData);
            })
        }else {
            resData.ret = 0;
            resData.msg = "修改失败";
            res.json(resData);
        }
    })
})

module.exports = router