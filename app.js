const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(bodyParser.urlencoded({limit: '50mb', extended: false }))

app.use(bodyParser.json({limit: '50mb'}))

app.use(express.static('public'));

app.use('/', require('./routes/index'))

mongoose.connect('mongodb://localhost:27017/blog_admin',{useNewUrlParser:true},  (err) => {
    if(err) {
        console.log(err);
    }else {
        console.log('数据库连接成功');
        app.listen(3000, () => {
            console.log('the port is listening');
        })
    }
});


