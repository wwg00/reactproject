const mysql = require('../db/mysql');
mysql.init(

)

module.exports = {
    init: function (app) {
        app.get("/getCartList", function (req, res) {
            var id =  req.query.id;
                   console.log(id);     
            if(!id ){
                return   res.send({status:0,mess:'id必须存在'});
            }
            var querySql = `
            SELECT a.id,a.goods_id,a.qty,a.create_at,a.update_at, a.option,
            b.account,b.update_at,b.pwd,b.integral,b.id as user_id ,b.like_goods_id,b.address_id,
            c.bImage,c.sImage,c.description,c.sale,c.oPrice,c.nPrice,c.size,c.color,c.storage,
            c.discount,c.type1,c.type2,c.type3 from bg_cart as a INNER JOIN bg_user as b 
            on a.user_id = b.id left JOIN bg_goods as c on a.goods_id = c.id where b.id = ${id} 
            `
            mysql.select(querySql, function (err, rows) {
                if (err) {
                    return res.send({ status: 0, mess: err });

                } else {
                    return res.send(JSON.stringify(rows));

                }
            });
        });
        app.get('/setGoodsQty',function(req,res){
            var id =  req.query.id;
                
            var goods_id =  req.query.goods_id;
            var user_id =  req.query.user_id;
            var qty=  req.query.qty;
            if(!id || !goods_id || !user_id || !qty){
              return  res.send({status:0,mess:"参数id goods_id user_id qty 必须同时存在"});
            }else{
               
       var sql = `update bg_cart set qty =? where  id=? and goods_id = ? and user_id = ? `;
        arr = [qty,id,goods_id,user_id];
        mysql.update(sql,arr,function(err,result){
            if(err){
                return   res.send({status:0,mess:err});

            }else{
                return  res.send({status:'ok',mess:'更新成功'});
                
            }
            
        })
    }
        })


        app.get('/deleteCartGoods',function(req,res){
            var id =  req.query.id;  
            
            if(!id ){
                return   res.send({status:0,mess:'id必须存在'});
            }

            var sql = `delete from bg_cart where id = ${id}`;
            mysql.delete(sql,function(err,result){
                if(err){
                    return   res.send({status:0,mess:err});

                }else{
                    return  res.send({status:'ok',mess:'删除成功'});
                    
                }
            })



        })
        app.get("/getUserAddress", function (req, res) {
            var user_id = req.query.user_id;
            if(!user_id){
                return   res.send({status:0,mess:'user_id必须存在'});
            }
            var querySql = `
            SELECT * from bg_address where user_id  = ${user_id}  
            `
            mysql.select(querySql, function (err, rows) {
                if (err) {
                    return res.send({ status: 0, mess: err });

                } else {
                    return res.send(JSON.stringify(rows));

                }
            });
        }); 
        app.get("/createOrder", function (req, res) {
            var user_id = req.query.user_id;
            var goods_json = req.query.goods_json;
            var total = req.query.total;
            var state = req.query.state?req.query.state:0;
            var method = req.query.method?req.query.method:1;
            
            
            if(!user_id || !goods_json || !total ){
                return   res.send({status:0,mess:'user_id goods_json total必须存在'});
            }
            var serial = parseInt(Math.random()*(10000-1000+1)+100,10);
            //订单号
            var orderNum = parseInt(Math.random()*(1000000000-10000000+1)+10000000,10);

            var sql = `INSERT into bg_order (user_id,goods_json,total,orderNum,state,serial,method) VALUE (${user_id},'${goods_json}',${total},'${orderNum}',${state},'${serial}',${method})`;
             mysql.insert(sql,function(err,result){
          

                   if (err) {
                    return res.send({ status: 0, mess: err });

                } else {
                    return  res.send({status:'ok',mess:'插入成功'});   

                }
             })

        });     
        app.get("/getUserOrder", function (req, res) {
            var user_id = req.query.user_id;
            if(!user_id){
                return   res.send({status:0,mess:'user_id必须存在'});
            }
            var querySql = `
        select *,a.id as order_id from bg_order as a inner JOIN bg_user as  b  on a.user_id = b.id where user_id = ${user_id}
            ORDER BY a.update_at desc
            
            `
            mysql.select(querySql, function (err, rows) {
                if (err) {
                    return res.send({ status: 0, mess: err });

                } else {
                    return res.send(JSON.stringify(rows));

                }
            });
        }); 


        app.get('/updateOrderState',function(req, res){
                        var id =  req.query.id;
                            
                        var state =  req.query.state;
                     
                        if(!id || !state){
                         return  res.send({status:0,mess:"参数id state 必须同时存在"});
                        }else{
                        
                var sql = ` update bg_order set state = ? where id = ?`;
                    arr = [state,id];
                    mysql.update(sql,arr,function(err,result){
                        if(err){
                            return   res.send({status:0,mess:err});

                        }else{
                            return  res.send({status:'ok',mess:'更新成功'});
                            
                        }
                        
                    })
                }
           
        })

        
        app.get('/deleteOrder',function(req, res){
                        var id =  req.query.order_id;
                            
                
                     
                        if(!id ){
                         return  res.send({status:0,mess:"orderid必须同时存在"});
                        }else{
                        
                        var sql = ` delete from bg_order where id = ${id}`;
                        
                            mysql.delete(sql,function(err,result){
                                if(err){
                                    return   res.send({status:0,mess:err});

                                }else{
                                    return  res.send({status:'ok',mess:'更新成功'});
                                    
                                }
                                
                            })
                }
           
        })
            



        
    }

}