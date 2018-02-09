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

            // 根据id获取商品
            app.get('/getGoodsInfo',function(req,res){
                    var id =  req.query.id;
                    // console.log(id);
                    if(!id){
                       return res.send({status:0,mess:'id参数不能为空'});       
                    }
                    var sql = `select * from bg_goods where id=${id} `;
                    mysql.select(sql,function(err,rows,result){
                        // console.log(JSON.stringify(rows))
                            if(err){
                             return   res.send({status:0,mess:err});
                            }else{
                               
                            return    res.send(JSON.stringify(rows));
                            }
                    });
                
            });
                
        
          
              
            
               
            
        }
}