const mysql = require('../db/mysql');
mysql.init(
    // {
    //     host: "10.3.136.59",
    //     root: "root",
    //     password: "",
    //     port: "3306",
    //     database: "bg"
    // }
)

module.exports = {
    init: function (app) {
        app.get("/getClassifyImg", function (req, res) {
            var _type1 = req.query.type1;
            var _order = req.query.order ? req.query.order : 'asc';  //默认是升序
            var _field = req.query.field ? req.query.field : 'id';    
            var querySql = `select * from bg_classifyimg where type1='${_type1}' order BY ${_field} ${_order}`
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