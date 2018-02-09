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
            // 获取轮播图数据
           app.post("/insertCart",function(req,res){
                       var goods_id =  req.body.goods_id;
                       var user_id = req.body.user_id;
                       var qty = req.body.qty;
                       var option = req.body.option;
                       // console.log(goods_id,user_id,qty)


                       if(!goods_id || !user_id){
                         return   res.send(JSON.stringify({status:"no",mess:"goods_id 和 user_id 必须存在"}));             
                       }else{
                           var qty = req.body.qty?req.body.qty:1;
                          
                         
                           var querySql = `select * from bg_cart where goods_id = ${goods_id} and user_id = ${user_id} and \`option\` = '${option}' `;
                           mysql.select(querySql,function(err,data){
                                   if(err){
                                            return   res.send({status:0,mess:err});
                                       
                                   }else{
                                       if(!data.length){
                                           //不存在则插入数据
                                           var sql = `insert into bg_cart (goods_id,user_id,qty,\`option\`) values(${goods_id},${user_id},${qty},'${option}')`;
                                         
                                           mysql.insert(sql,function(err,result){
                                               // console.log(err)
                                            if(err){
                                                return   res.send({status:'err',mess:''});
                                            }else{


                                                return   res.send({status:'ok',mess:'插入成功'});
                                            }
                                           })
                                       }else{
                                           var sql = `UPDATE bg_cart set qty=? where goods_id =? and user_id =? and \`option\`=?`;
                                           arr = [parseInt(data[0].qty)+parseInt(qty),goods_id,user_id,option];
                                           mysql.update(sql,arr,function(err,result){
                                               // console.log(result);
                                           return    res.send({status:'ok',mess:'更新成功'});
                                               
                                           })
                                       }
                                   }
                           });
                       }
           

                       
                       

                      
           });

    

            

  
          
              
            
               
            
        }
}