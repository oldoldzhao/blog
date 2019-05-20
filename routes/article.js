const express = require('express');
const router = express.Router();
const Article =  require('../model/article');

router.get('/show', (req, res) => {
    let resData = {};
    let page = req.query.page && req.query.page > 0 ? parseInt(req.query.page)  : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 20;

    Article.find({}, {
        title: 1,
        time: 1,
        type: 1,
        imgId: 1,
        _id: 1
    }).skip((page - 1) * limit).limit(limit).then( data => {
        if(data) {
            resData.list = data
        } else {
            resData.list = [];
        }

        resData.res = 1;
        resData.msg = 'ok';
        Article.countDocuments({}, function (err, count) {
            resData.count = count;

            res.json(resData);
        });
    })
})

router.get('/details', (req, res) => {
    let resData = {};
    let _id = req.query.id;
    
    Article.find({
        _id
    }, {
        title: 1,
        time: 1,
        type: 1,
        imgId: 1,
        content: 1,
        _id: 1
    }).then( data => {
        if(data) {
            resData.data = data[0]
        } else {
            resData.list = {};
        }

        resData.res = 1;
        resData.msg = 'ok';

        res.json(resData);
    })
})

router.get('/list', (req, res) => {
    let resData = {};
    let page = req.query.page && req.query.page > 0 ? parseInt(req.query.page)  : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 20;

    Article.find({}, {
        title: 1,
        time: 1,
        type: 1,
        content: 1,
        abstract: 1,
        imgId: 1,
        _id: 1
    }).skip((page - 1) * limit).limit(limit).then( data => {
        if(data) {
            resData.list = data
        } else {
            resData.list = [];
        }

        resData.res = 1;
        resData.msg = 'ok';
        Article.countDocuments({}, function (err, count) {
            resData.count = count;

            res.json(resData);
        });
    })
})

router.post('/create', (req, res) => {
    let resData = {};
    
    const title = req.body.title;
    const time = new Date().getTime();
    const type = req.body.type;
    const content = req.body.content; 
    const abstract = req.body.abstract; 
    const imgId = req.body.imgId; 

    Article.create({
        title,
        time,
        type,
        content,
        abstract,
        imgId
    }).then(data => {
        // console.log(data);

        resData.msg = 'ok',
        resData.ret = 1,

        res.json(resData);
    })
})

router.post('/update', (req, res) => {
    let resData = {};

    const title = req.body.title;
    const type = req.body.type;
    const content = req.body.content;
    const abstract = req.body.abstract;
    const imgId = req.body.imgId;
    const _id = req.body.id;

    const data = {
        title,
        type,
        content,
        abstract,
        imgId
    };

    Article.findOne({
        _id
    }).then(content => {
        if(content) {
            Article.updateOne({
                _id
            },data).then(response => {
                if(response.ok == 1) {
                    resData.ret = 1;
                    resData.msg = 'ok',

                    res.json(resData);
                }else {
                    resData.ret = 1;
                    resData.msg = 'error',

                    res.json(resData);
                }
            })
        }
    })
})

router.post('/delete', (req, res) => {
    let resData = {};

    const _id = req.body._id;

    Article.deleteOne({
        _id
    }).then(response => {
        if(response.ok == 1) {
            resData.ret = 1;
            resData.msg = 'ok';
        }else {
            resData.ret = 1;
            resData.msg = 'error';
        }

        res.json(resData);
    })
})

module.exports = router;