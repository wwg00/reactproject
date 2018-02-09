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



            app.get('/history',function(req,res){
                    
                var user_id=req.query.user_id;console.log(user_id)
                var goods_id=req.query.goods_id;
                if(!user_id){
                   return res.send({status:0,mess:'user_id参数不能为空'});       
                }
               
                
                var sql=`SELECT * FROM bg_user where id=${user_id} limit 1`
                mysql.select(sql,function(err,rows,result){
                    // console.log(JSON.stringify(rows))
                        if(err){
                         return   res.send({status:0,mess:err});
                        }else{

                            console.log(rows[0].history);
                            if(rows[0].history==''){
                                var mid=goods_id;
                                console.log(goods_id);
                            }else{
                                var mid=rows[0].history+';'+goods_id;
                            }
                         
                         
                    var sql2 = `UPDATE bg_user set history='${mid}' WHERE id=${user_id};`;
                           
                            mysql.select(sql2,function(error,rows,result){

                                  if(error){
                                     return res.send({status:0,mess:error});
                                  }else{
                                      return res.send({res:'ok'});
                                  }
                            })
                          
                        }
                });
            
        });

            
               
            
        }
}