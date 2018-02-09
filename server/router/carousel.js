const mysql = require('../db/mysql');
mysql.init(
    // {
    //     host:"10.3.136.59",
    //     root: "root",
    //     password: "",
    //     port: "3306",
    //     database: "bg"
    // }
)

module.exports = {
    init: function (app) {
        // 获取轮播图数据
        app.get("/getCarousel", function (req, res) {
            // var querySql = `select b.title,a.carouselUrl,a.goods_id as id FROM  bg_carouse as a   INNER JOIN bg_goods as b on  a.goods_id = b.id `;
            var querySql = `select b.carouselUrl from bg_carouse as b`
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