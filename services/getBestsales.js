const connection = require('../db/db')

function getBestsales(res) {
    connection.connect(function (err) {
        if (err) throw err;
        connection.query(`SELECT product_id,title,category_id,category_title,author,list_price,stock_quantity FROM products ORDER BY saleratio DESC  LIMIT 4`, function (err, result) {
            if (err) throw err.message;
            res.send(result)
        })
    })
}

module.exports = getBestsales