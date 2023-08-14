const mysql = require('mysql2')

const config = {
    database:{
        host: '172.23.0.2', // default gateway host olarak verilmelidir 192.168.0.1  3366
        user: 'root',
        port: '3366', 
        password: 'tesla123',
        database:"productsdb"
      },
      admin:{
        username: 'admin',
        password: 'admin'
      }
}


let connection = mysql.createConnection(config.database);

module.exports = connection