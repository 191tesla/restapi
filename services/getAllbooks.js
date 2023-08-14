const connection = require('../db/db')

function getAllbooks(res) {
    connection.connect(function (err) {
        if (err) throw err;
        connection.query(`SELECT product_id,title,category_id,category_title,author,list_price,stock_quantity FROM products`, function (err, result) {
            if (err) throw err.message;
            res.send(result)
        })
    })
}

module.exports = getAllbooks