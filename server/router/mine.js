

const mysql = require('../db/mysql')
mysql.init();
module.exports = {

    register:function(app){
        app.get('/wgetuser',function(req,res){
            console.log(11111111111111111111111111111);
            var id=req.query.id;
            var querySql = `SELECT * FROM bg_user where id=${id} limit 1`
            mysql.select(querySql, function (err, rows) {
                if (err) {
                    return res.send({ status: 0, mess: err });

                } else {
                    return res.send(JSON.stringify(rows));

                }
            });
    

        });
        app.get('/getMyGoods',function(req,res){
            console.log(11111111111111111111111111111);
            var id=req.query.id;
            var querySql = `select * from bg_goods where id=${id} `
            mysql.select(querySql, function (err, rows) {
                if (err) {
                    return res.send({ status: 0, mess: err });

                } else {
                    return res.send(JSON.stringify(rows));

                }
            });
    

        });
        //  app.get('/getGoods',function(req,res){
        //             // var id =  req.query.id;
        //             // if(!id){
        //             //    return res.send({status:0,mess:'id参数不能为空'});       
        //             // }
        //             // var sql = ;
        //             mysql.select(`select * from bg_goods where id=1 `,function(err,rows,result){
        //                 // console.log(JSON.stringify(rows))
        //                     if(err){
        //                      return   res.send({status:0,mess:err});
        //                     }else{
        //                       console.log(rows) ;
        //                     return    res.send(JSON.stringify(rows));
        //                     }
        //             });
                
        //     });

         app.get('/clearhistory',function(req,res){
                    var id =  req.query.id;
                    console.log(id);
                    if(!id){
                       return res.send({status:0,mess:'id参数不能为空'});       
                    }
                    var sql = `UPDATE bg_user set history='' WHERE id=${id};`;
                    mysql.select(sql,function(err,rows,result){
                        // console.log(JSON.stringify(rows))
                            if(err){
                             return   res.send({status:0,mess:err});
                            }else{
                               
                            return  res.send({res:'ok'});
                            }
                    });
                
            });
          app.get('/setaddress',function(req,res){
                    var user_id =  req.query.user_id;
                    var _address=req.query.address;
                    var _postcode=req.query.postcode;
                    var _consignee=req.query.receivers;
                    var _number=req.query.number;
                    console.log(req.query);
                    if(!user_id){
                       return res.send({status:0,mess:'user_id参数不能为空'});       
                    }
                    var sql = `INSERT INTO bg_address(user_id,address,postcode,consignee,number) values(${user_id},'${_address}','${_postcode}','${_consignee}','${_number}')`;
                    mysql.select(sql,function(err,rows,result){
                        // console.log(JSON.stringify(rows))
                            if(err){
                             return   res.send({status:0,mess:err});
                            }else{
                               
                              return  res.send({res:'ok'});
                            }
                    });
                
            });
          app.get('/selectAddress',function(req,res){
                    var id =  req.query.address_id;
                    var user_id=req.query.user_id;
                   
                    if(!id){
                       return res.send({status:0,mess:'user_id参数不能为空'});       
                    }
                    var sql2 = `UPDATE bg_address set state=1 WHERE id=${id};`;
                    var sql=`UPDATE bg_address set state=0 WHERE user_id=${user_id}`

                    mysql.select(sql,function(err,rows,result){
                        // console.log(JSON.stringify(rows))
                            if(err){
                             return   res.send({status:0,mess:err});
                            }else{
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

             app.get('/firstAddress',function(req,res){
                   
                    var user_id=req.query.user_id;
                   
                    if(!user_id){
                       return res.send({status:0,mess:'user_id参数不能为空'});       
                    }
                    var sql = `UPDATE bg_address set state=1 WHERE user_id=${user_id};`;
                    

                    mysql.select(sql,function(err,rows,result){
                        // console.log(JSON.stringify(rows))
                            if(err){
                             return   res.send({status:0,mess:err});
                            }else{

                                    res.send({res:'ok'});  
                              
                            }
                    });
                
            });

          app.get('/getaddress',function(req,res){
                    var user_id =  req.query.user_id;
                    
                    if(!user_id){
                       return res.send({status:0,mess:'user_id参数不能为空'});       
                    }
                    var sql = `SELECT * FROM bg_address where user_id=${user_id} `;
                    mysql.select(sql,function(err,rows,result){
                        // console.log(JSON.stringify(rows))
                            if(err){
                              return   res.send({status:0,mess:err});
                             
                            }else{
                               
                              return res.send(JSON.stringify(rows));
                            }
                    });
                
            });
              
            app.get('/deleteAddress',function(req,res){
                    var id =  req.query.address_id;
                    
                    if(!id){
                       return res.send({status:0,mess:'id参数不能为空'});       
                    }
                    var sql = `DELETE from bg_address where id=${id}; `;
                    mysql.select(sql,function(err,rows,result){
                            if(err){
                              return   res.send({status:0,mess:err});
                            }else{
                               
                              return res.send({res:'ok'});
                            }
                    });
                
            });

           
            
           app.get('/exist',function(req,res){
            
            var id=req.query.user_id;
            var querySql = `select count(*) as count from bg_address where user_id = ${id}`
            mysql.select(querySql, function (err, rows) {
                if (err) {
                    return res.send({ status: 0, mess: err });

                } else {

                    return res.send(JSON.stringify(rows));

                }
            });
    

        });

    }
}



