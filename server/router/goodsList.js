const mysql  = require('../db/mysql');
mysql.init(
    // {
    //     host:"10.3.136.59",
    //     root:"root",
    //     password:"",
    //     port:"3306",
    //     database:"bg"
    // }
)

module.exports = {
    init:function(app){
        app.get('/ygetGoodsInfo',function(req,res){
            console.log(666)
            // type1type3是分类跳转的---男装,羽绒服.type3是主页跳转的---羽绒服
            var type1 =  req.query.type1;
            var type3 =  req.query.type3;
            console.log(type3)
            if(!type1 && !type3){
        
               return res.send({status:0,mess:'type3参数不能为空'}); 
            }else if(!type1 && type3){
     
                var sql = `select * from bg_goods where type3 = '${type3}' `;
            }else if(type1 && type3){
        
               var sql = `select * from bg_goods where type1 = '${type1}' and type3 = '${type3}'`; 
            }else if(type1 && !type3){
                var sql = `select * from bg_goods where type1 = '${type1}' `;
            }
            mysql.select(sql,function(err,rows,result){
                if(err){
                    return res.send({status:0,mess:err});
                }else{
                    return res.send(JSON.stringify(rows));
                }
            });        
        }); 
        app.get('/ysale',function(req,res){
            // type1type3是分类跳转的---男装,羽绒服.type3是主页跳转的---羽绒服
            var type1 =  req.query.type1;
            var type3 =  req.query.type3;

            if(!type1 && !type3){

               return res.send({status:0,mess:'type3参数不能为空'}); 
            }else if(!type1 && type3){
               
                var sql = `select * from bg_goods where type3 = '${type3}'  order BY sale desc`;
            }else if(type1 && type3){
         
               var sql = `select * from bg_goods where type1 = '${type1}' and type3 = '${type3}'  order BY sale desc `; 
            } else if (type1 && !type3) {
                var sql = `select * from bg_goods where type1 = '${type1}' `;
            }
            mysql.select(sql,function(err,rows,result){
                if(err){
                    return res.send({status:0,mess:err});
                }else{
                    return res.send(JSON.stringify(rows));
                }
            });        
        }); 
        app.get('/ypriceU',function(req,res){
            // type1type3是分类跳转的---男装,羽绒服.type3是主页跳转的---羽绒服
            var type1 =  req.query.type1;
            var type3 =  req.query.type3;
        
            if(!type1 && !type3){
            
               return res.send({status:0,mess:'type3参数不能为空'}); 
            }else if(!type1 && type3){
             
                var sql = `select * from bg_goods where type3 = '${type3}'  order BY nPrice asc`;
            }else if(type1 && type3){
                
               var sql = `select * from bg_goods where type1 = '${type1}' and type3 = '${type3}'  order BY nPrice asc `; 
            } else if (type1 && !type3) {
                var sql = `select * from bg_goods where type1 = '${type1}' `;
            }
            mysql.select(sql,function(err,rows,result){
                if(err){
                    return res.send({status:0,mess:err});
                }else{
                    return res.send(JSON.stringify(rows));
                }
            });        
        });
        app.get('/ypriceD',function(req,res){
            // type1type3是分类跳转的---男装,羽绒服.type3是主页跳转的---羽绒服
            var type1 =  req.query.type1;
            var type3 =  req.query.type3;
            if(!type1 && !type3){
               return res.send({status:0,mess:'type3参数不能为空'}); 
            }else if(!type1 && type3){
                var sql = `select * from bg_goods where type3 = '${type3}'  order BY nPrice desc`;
            }else if(type1 && type3){
               var sql = `select * from bg_goods where type1 = '${type1}' and type3 = '${type3}'  order BY nPrice desc `; 
            } else if (type1 && !type3) {
                var sql = `select * from bg_goods where type1 = '${type1}' `;
            }
            mysql.select(sql,function(err,rows,result){
                if(err){
                    return res.send({status:0,mess:err});
                }else{
                    return res.send(JSON.stringify(rows));
                }
            });        
        });
        app.get('/shaixuan',function(req,res){
            // type1type3是分类跳转的---男装,羽绒服.type3是主页跳转的---羽绒服
            var type1 =  req.query.type1;
            var type3 =  req.query.type3;
            var nPrice =  req.query.nPrice;
            var size =  req.query.size;
            var color =  req.query.color;
            console.log(req.query)
            // console.log(type1)
            // console.log(type3)
            // console.log(nPrice)
            // console.log(size)
            // console.log(color)
            if(!type1 && !type3){
               return res.send({status:0,mess:'type3参数不能为空'}); 
            }else{
                var sql = "select * from bg_goods where "
                for(var attr in req.query){
                    // 如果有值
                    if(req.query[attr]){
                        // sql +=  attr + " = '" + req.query[attr] + "' and "
                        sql += attr + " like '%" + req.query[attr] + "%' and "
                    }
                }
            }
                    sql= sql.substr(0, sql.length - 4)






            //  if(!type1 && type3){
            //     var sql = `select * from bg_goods where type3 = '${type3}'`;
            // }else{
            //     console.log(3)
            //    var sql = `select * from bg_goods where type1 = '${type1}' and type3 = '${type3}' and nPrice = '${nPrice}' and size = '${size}' and color = '${color}' `; 
            // }
            mysql.select(sql,function(err,rows,result){
                if(err){
                    return res.send({status:0,mess:err});
                }else{
                    return res.send(JSON.stringify(rows));
                }
            });        
        });
    }
}