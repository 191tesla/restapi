const connection = require('../db/db')
class insertTables {
    insertProducts(data) {
        data.forEach(book => {
            const sql_ins = `INSERT INTO products (product_id, title, category_id, category_title, author, list_price, stock_quantity, img, saleratio) 
            VALUES (${book["product_id"]}, "${book["title"]}", ${book["category_id"]}, "${book["category_title"]}", "${book["author"]}", ${book["list_price"]}, 
            ${book["stock_quantity"]}, "0", 0)`
            connection.connect(function (err) {
            if (err) throw err;
            connection.query(sql_ins, function (err, result) {
                if (err) throw err.message;
               
                })
            })
        });
    }

    insertOrders(data) {
        data.forEach(Orders => {`INSERT INTO ordersdb ( discountId, priceAll, dicountPrice, withoutdiscount, discountName, shippingCost, basket) VALUES ( '1', '125.3', '0.0', '90.3', 'İndirim yoktur', '35', '[{\"title\": \"Tutunamayanlar\", \"author\": \"Oğuz Atay\", \"category\": \"Roman\", \"list_price\": \"90.30\", \"product_id\": 2, \"order_quantity\": 1}]')`
            connection.connect(function (err) {
            if (err) throw err;
            connection.query(sql_ins, function (err, result) {
                if (err) throw err.message;
               
                })
            })
        });
       
       
    }

    insertCampaigns(data) {

        data.forEach(campaign => {
            const sql_ins = `INSERT INTO campain (campain_id, campain_name, campain_dis, campain_ratio, active, author, campain_limit) 
            VALUES (${campaign["campain_id"]}, "${campaign["campain_name"]}", ${campaign["campain_dis"]}, ${campaign["campain_ratio"]}, 
            ${campaign["active"]}, "${campaign["author"]}", ${campaign["campain_limit"]});
            `
            connection.connect(function (err) {
            if (err) throw err;
            connection.query(sql_ins, function (err, result) {
                if (err) throw err.message;
               
                })
            })
        });
    }
}

module.exports = new insertTables()