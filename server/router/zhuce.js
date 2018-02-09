const mysql = require('../db/mysql');
mysql.init(
	// {
	// 	host: "10.3.136.59",
	// 	root: "root",
	// 	password: "",
 //        port: "3306",		
	// 	database: "bg"
	// }
)

module.exports = {
	init:function(app){
		app.post("/inUser", function(req, res){
			// console.log(666)
			//发一条sql语句   select insert delete update mysql.jia
			//sql   调用  mysql.select _cb  1 0if(1)resend no 0(sql.mysql) send(yes)			
			var account = req.body.account ? req.body.account:0;
			var username = req.body.username ? req.body.username:'用户'+req.body.account;
			var pwd  = req.body.password; 
//			var integral  = req.body.integral ? req.body.integral:0;
//			var like_goods_id  = req.body.like_goods_id ? req.body.like_goods_id:0;
//			var address_id  = req.body.address_id ? req.body.address_id:0;
//			var history  = req.body.history ? req.body.history:0;
//			if(account==0 && username == 0){
//				return res.send({result:'no', mess:"account 和 username 必须存在一个"})
//			}else if(!account && username){
//              var _sql = `select * from bg_user where username = ${username}`;
//			}else if(account && !username){
//              var _sql = `select * from bg_user where account = ${account}`;
//			}else{
//              var _sql = `select * from dg_user where account = ${account} or username = ${username}`;    
//         }
//			var sql = `SELECT * FROM bg_user where account = '${account}' and password = ${password}`
			
			//第一步：查是否已有相同得手机号  如果有就返回no  如果无返回yes
			var sql = `SELECT * FROM bg_user where account = '${account}'`
			mysql.select(sql,function(err,rows){
				if(err){
					res.send({result:'请求失败',mess:err})
//					console.log(res);
				}else{
					console.log(rows);
					if(rows.length>0){
						res.send({result:false})
					}else{
						var insertSql = `INSERT into bg_user (account,username,pwd,integral,like_goods_id,address_id) VALUES (${account},'${username}',${pwd},'0','0','0')`
						mysql.insert(insertSql, function(err, result){
							console.log('yes')
							if(rows.length>0){
								res.send({result:false, mess:err});
							}else{
								res.send({result:true, mess:"注册成功", result:true})	
							}
						})
					}
				}
			})
				
//			mysql.select(_sql,function(err,rows){
//              if(err){
//                    res.send({result:'no',mess:err});
//                    return false;
//              }
////              for(var i =0;i<database.bg_user.account.length)
//				
//              if(){
//					var sql = `INSERT into bg_user (account,username,pwd,integral,like_goods_id,address_id) VALUES (${account},'${username}',${pwd},'0','0','0')`
//					mysql.insert(sql, function(err, result){
//						console.log(222)
//						if(err){
//							res.send({status: 'no', mess:err});
//						}else{
//							res.send({status: 'yes', mess:"注册成功", result:result})
//							console.log(333)	
//						}
//					})
//				}else{
//                 res.send({result:'no',mess:'手机号或者卡号已经存在'});
//                 return false;    
//             	}
//				sql = SELECT * from bg_user WHERE account = ${the} 
//			})
			
			
			
			
		})//post
		
		
	}
}

