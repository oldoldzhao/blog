const express = require('express');
const ImgUp = require('../model/imgUp');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "upload_img");
    },
    filename: function(res, file, cb) {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
})

const upload = multer({
    storage
})

router.post('/', upload.any(), (req, res) => {
    let resData = {};
    const url = req.files[0].path;
    const name = req.files[0].originalname;
    
    ImgUp.create({
        url,
        name
    }).then(data => {
        resData.ret = 1;
        resData.msg = "ok",
        resData.id = data._id;

        res.json(resData);
    })
})

router.get('/file', (req, res, next) => {
    const _id = req.query.id;
    
    if (_id.match(/^[0-9a-fA-F]{24}$/)) {
        ImgUp.findOne({
            _id
        },{
            url: 1,
            name: 1
        }).then(data => {
            const path = data.url;
            const name = data.name;
            const stat = fs.statSync(path);
            const f = fs.createReadStream(path);
            const nameArr = name.split('.')
            const filename = 'images.' + nameArr[nameArr.length - 1];
    
            // Content-disposition 是 MIME 协议的扩展，MIME 协议指示 MIME 用户代理如何显示附加的文件。当 Internet Explorer 接收到头时，它会激活文件下载对话框，它的文件名框自动填充了头中指定的文件名
    
            if(!path) {
                next();
            }
    
            res.writeHead(200, {
                "Content-type": "iamge",
                "Content-Length": stat.size,
                // 'Content-Disposition': 'attachment; filename=' + encodeURIComponent(path)
                // 'Content-Disposition': 'attachment; filename=' + filename //--设置网页打开该链接文件下载
            })
    
            f.pipe(res);
        })
    }

})

module.exports = router;