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
           
        
            app.get("/insertComment",function(req,res){
       

                var user_id =  req.query.user_id;
                var goods_id =  req.query.goods_id;
                var grade=  req.query.grade;
                var comment =  req.query.comment;
                if(!user_id  || !goods_id ||!grade|| !comment  ){
                    return res.send({status:0,mess:'user_id goods_id grade comment 都不能为空'});       

                }
                
                
                
                var sql = `insert into bg_comment(user_id,goods_id,grade,comment) VALUES(${user_id},${goods_id},${grade},'${comment}')`;
                // console.log(sql);
                mysql.insert(sql,function(err,result){
                        if(err){
                             return res.send({status:0,mess:err});
                        }else{
                            return res.send({status:'ok',mess:'添加评论成功'});
                            };
                });

         
                
                       
            });

             // 获取评论
            app.get('/getComment',function(req,res){
                     var page = req.query.page;
                    // var sql = `select a.id,a.user_id,a.goods_id,a.grade,a.comment,a.create_at,a.update_at,b.account,b.username,b.pwd,b.integral,b.like_goods_id,b.address_id,c.bImage,c.sImage,c.description,c.sale,c.oPrice,c.nPrice from bg_comment as a INNER JOIN bg_user as b on a.user_id = b.id  INNER JOIN bg_goods as c on a.goods_id = c.id order BY create_at desc`;
                    var sql = `select * from bg_comment `;
                    mysql.select(sql,function(err,rows,result){
                        // console.log(rows)
                        if(err){
                            return   res.send({status:0,mess:err});
                           }else{
                           return    res.send(JSON.stringify(rows));
                           }
                    })
            })

    



        }
   
}