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
		app.post("/geiUser", function(req, res){
			// console.log(666)
			var account = req.body.account ? req.body.account:0;
			var username = req.body.username ? req.body.username:'用户'+req.body.account;
			var pwd  = req.body.password; 
			
			var sql = `SELECT id,username FROM bg_user where account = '${account}' and pwd = ${pwd}`
			mysql.select(sql, function(err, rows){
				if(err){
					res.send({result: '请求失败', mess:err})
				}else{
					// console.log(rows,"rows")
					if(!rows.length>0){
						res.send({result: false})
					}else{
						res.send({result:true, mess:"登录成功", data:rows})
					}
				}
			})
			
			
			
		})//post
		
		
		
	}//init
}
