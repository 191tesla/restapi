const connection = require('../db/db')

class campaign {
    campaign() {
        
        return new Promise(function(resolve, reject) {connection.connect(function (err) {
            if (err) {return reject(err);}
            if (err) throw err;
            connection.query(`SELECT * FROM campain`, function (err, result) {
                if (err) throw err.message;
                resolve(result)
                
            })
        })})
    }
}

module.exports = new campaign()