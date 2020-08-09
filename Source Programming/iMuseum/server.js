const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');//文件路径
const multer = require('multer');//上传文件
const multerObj = multer({
    dest: './static/upload'
});//上传目标文件夹

const consolidate = require('consolidate');

let server = express();
server.listen(8080);

// 1.获取请求数据
server.use(bodyParser.urlencoded({extended: true}));
server.use(multerObj.any());

// 2.模板
server.engine('html', consolidate.ejs)
server.set('views', 'template')
server.set('view engine', 'html')

// 3.route
server.get('/',(req, res) => {
    if (req.url != '/home') {
        res.redirect('/home')
    }
})
server.use('/home', require('./route')())//调用index.js
server.use('/web', require('./route/web')())
server.use('/admin', require('./route/admin')())
server.use('/register', require('./route/register')())

// 4.static
server.use(express.static('./static/'));
