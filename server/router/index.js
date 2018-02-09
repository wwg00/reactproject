var express = require('express');
var app = express();


//在这里引入自己的router

var goodslist = require('./goodslist.js');
var back = require('./back.js');



var L_comment = require('./L_comment.js'); //评论页面
var L_detail = require('./L_detail.js');//商品详情
var L_inserCart = require('./L_inserCart.js');//添加购物车


var carousel = require('./carousel');

var cart = require('./cart');



var zhuce = require('./zhuce');
var login = require('./login.js');
var history = require('./L_history.js');


var getGoodsByType3 = require('./getGoodsByType3')
var getClassifyImg = require('./getClassifyImg')



var mine= require('./mine');








var a ;
var bp = require('body-parser');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
    })

app.use(bp.urlencoded({extended: false}));
module.exports = {
     start(port){


          L_comment.init(app);
          L_detail.init(app);
          L_inserCart.init(app);
         
 

        goodslist.init(app);
        back.init(app);
        carousel.init(app);

        cart.init(app);  
        mine.register(app);
 
 

        history.init(app);
        zhuce.init(app);
        login.init(app);
       
        getGoodsByType3.init(app);
        getClassifyImg.init(app);
        
        app.listen(port);


     }
}
