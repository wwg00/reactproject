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
        app.get("/getGoodsByType3", function (req, res) {
            // var querySql = `select b.title,a.carouselUrl,a.goods_id as id FROM  bg_carouse as a   INNER JOIN bg_goods as b on  a.goods_id = b.id `;
            var _type3 = req.query.type3;
            // var querySql = `select * from bg_goods where type3 =${type3}`;
            var _impose = req.query.impose ? req.query.impose : 8; //只显示8条数据
            var _skip = req.query.skip ? req.query.skip : 0;   // 跳过0条数据
            var _order = req.query.order ? req.query.order : 'desc';  //默认是降序
            var _field = req.query.field ? req.query.field : 'create_at';   //默认是以create_at          
            var sql = `select * from bg_goods where type3='${_type3}' order BY  ${_field} ${_order} limit ${_skip},${_impose} `;
            mysql.select(sql, function (err, rows) {
                if (err) {
                    return res.send({ status: 0, mess: err });

                } else {
                    return res.send(JSON.stringify(rows));

                }
            });
        });
    }
}