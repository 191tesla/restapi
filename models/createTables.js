const connection = require('../db/db')



class createtables {
    createProductsTable(res){
        connection.connect(function (err) {
            const sql = `
            CREATE TABLE IF NOT EXISTS products  (
                product_id int NOT NULL AUTO_INCREMENT,
                title varchar(100) NOT NULL,
                category_id int NOT NULL,
                category_title varchar(45) NOT NULL,
                author varchar(45) NOT NULL,
                list_price decimal(10,2) NOT NULL,
                stock_quantity int NOT NULL,
                img varchar(45) NOT NULL,
                saleratio int DEFAULT 0,
                PRIMARY KEY (product_id),
                UNIQUE KEY product_id_UNIQUE (product_id)
                ) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
            `
            if (err) throw err;
            connection.query(sql, function (err, result) {
                if (err) throw err.message
            })
        })
    }


    createCampaignTable(res) {
        connection.connect(function (err) {
            const sql = `
            CREATE TABLE IF NOT EXISTS campain (
                campain_id int NOT NULL,
                campain_name varchar(45) DEFAULT NULL,
                campain_dis int NOT NULL,
                campain_ratio float DEFAULT NULL,
                active int DEFAULT NULL,
                author varchar(100) DEFAULT NULL,
                campain_limit int NOT NULL,
                PRIMARY KEY (campain_id)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
            `
            if (err) throw err;
             connection.query(sql, function (err, result) {
                if (err) throw err.message
            })
        })
    }

    createOrdersTable(res) {
        connection.connect(function (err) {
            const sql = `
            CREATE TABLE IF NOT EXISTS ordersdb (
                 orderId int NOT NULL AUTO_INCREMENT,
                 discountId int NOT NULL,
                 priceAll float NOT NULL,
                 dicountPrice float DEFAULT NULL,
                 withoutdiscount float DEFAULT NULL,
                 discountName varchar(100) DEFAULT NULL,
                 shippingCost float DEFAULT NULL,
                 basket json DEFAULT NULL,
                PRIMARY KEY (orderId)
              ) ENGINE=InnoDB AUTO_INCREMENT=433 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
            `
            if (err) throw err;
             connection.query(sql, function (err, result) {
                if (err) throw err.message
            })
        })
    }




}

module.exports = new createtables()


