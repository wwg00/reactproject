const mysql  = require('../db/mysql');
mysql.init(

)

module.exports = {
    init:function(app){
        app.get('/login',function(req,res){

            var username =  req.query.username;
            var password =  req.query.password;
            var sql = `select * from bg_user where username='${username}' and pwd='${password}'`;

            mysql.select(sql,function(err,rows,result){

                if(err){
                    return res.send({status:0,mess:err});
                }else{
                    return res.send(JSON.stringify(rows));
                }
            });        
        }); 

        app.get('/getGoods',function(req,res){
            console.log(req.query)
            if(req.query.status == 'origin'){
                var _impose =  req.query.impose?req.query.impose:6; //只显示8条数据
                var _skip   =  req.query.skip?req.query.skip:0;   // 跳过0条数据
                var _order =  req.query.order?req.query.order:'desc';  //默认是降序
                var _field =  req.query.field?req.query.field:'create_at';   //默认是以create_at          
                var sql =  `select * from bg_goods order BY  ${_field} ${_order} limit ${_skip},${_impose}`;
                mysql.select(sql,function(err,rows,fields){
                    if(err){
                       return res.send({status:0,mess:err});
                        
                    }else{
                        res.send(JSON.stringify(rows)); 
                    }
                })
            }else if(req.query.status == 'search'){
                    
                var _impose =  req.query.impose?req.query.impose:6; //只显示8条数据
                var _skip   =  req.query.skip?req.query.skip:0;   // 跳过0条数据
                var _order =  req.query.order?req.query.order:'desc';  //默认是降序
                var _field =  req.query.field?req.query.field:'create_at';
                var keyword = req.query.keyword;
                var choice = req.query.choice;
                 if(!keyword)
                 {
                  return res.send({status:0,mess:'keyword,关键字不能为空'}); 
                 }else{

                 var sql = `select * from bg_goods where ${choice} like '%${keyword}%'  order BY  ${_field} ${_order} limit ${_skip},${_impose}`
                 
                 mysql.select(sql,function(err,rows,fields){
                    if(err){
                        console.log(err);
                        return res.send({status:0,mess:err});
                    }else{
                        return res.send(JSON.stringify(rows));
                    }
                 })
                }

            }else if(req.query.status == 'delete'){
                var id  = req.query.id;
                if(!id){
                    return res.send({status:0,mess:"删除的商品的id必须存在"});     
                }
                var sql = `delete from bg_goods where id = ${id}`;
                mysql.delete(sql,function(err,result){
                    if(err){
                        return res.send({status:0,mess:err});     
                    }else{
                        return res.send({status:'ok',mess:'删除商品成功'});
                    }
                })

            }
        });


        app.get('/getUser',function(req,res){
            var sql = `select * from bg_user`;

            mysql.select(sql,function(err,rows,result){

                if(err){
                    return res.send({status:0,mess:err});
                }else{
                    return res.send(JSON.stringify(rows));
                }
            });        
        });

        app.get('/getCart',function(req,res){
            var sql = `select * from bg_cart`;

            mysql.select(sql,function(err,rows,result){

                if(err){
                    return res.send({status:0,mess:err});
                }else{
                    return res.send(JSON.stringify(rows));
                }
            });        
        });

        app.get('/getComment',function(req,res){
            console.log(req.query.id)
            var sql;
            // if(req.query.status == 'getData'){
                sql = "select * from bg_comment ";
                // if(req.query.id == 1){
                    console.log(999)
                    // sql += "where id = " + req.query.id
                // }
            // }

            mysql.select(sql,function(err,rows,result){

                if(err){
                    return res.send({status:0,mess:err});
                }else{
                    return res.send(JSON.stringify(rows));
                }
            });        
        });

        app.get('/getOrder',function(req,res){
            var sql = `select * from bg_order`;

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