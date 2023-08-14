const connection = require('../db/db')

const campaign = require('./getCampaigns')

function orderindex(sumPrice, baskets) {
    return new Promise(function (resolve, reject) {
        var sql = `INSERT INTO ordersdb SET discountId=1, priceAll=${parseFloat(sumPrice)} ,basket ='${JSON.stringify(baskets)}'`
        connection.query(sql, async function (err, result) {
            if (err) {
                return reject(err);
            }
            resolve(result.insertId);
        })
    })
}

function orderProcess(orders) // order create
{
    var sumPrice = 0
    var shipping = 35
    var freeShiping = 150
    const baskets = []
    const campain = []
    var discount_limit = 100
    let isJoin = false
    return new Promise(function (resolve, reject) {
        connection.query(`SELECT product_id,title,category_id,category_title,author,list_price,stock_quantity FROM products`, async function (err, result) {
            if (err) { return reject(err); }
            if (err) throw err.message;
            for (i = 0; i < orders.length; i++) {
                for (j = 0; j < result.length; j++) {
                    if (orders[i].product_id === result[j].product_id) {
                        if (orders[i].order_quantity <= result[j].stock_quantity && orders[i].order_quantity > 0) {   //stock control, order_quantity must be bigger than 0

                            sumPrice += parseFloat(result[j].list_price) * parseFloat(orders[i].order_quantity)

                            baskets.push({ product_id: orders[i].product_id, order_quantity: orders[i].order_quantity, author: result[j].author, list_price: result[j].list_price, title: result[j].title, category: result[j].category_title })
                            
                            connection.query(`UPDATE products SET stock_quantity=${Number(result[j].stock_quantity - orders[i].order_quantity)}, saleratio= saleratio + ${orders[i].order_quantity} WHERE product_id=${result[j].product_id}`, async function (err, result) { // update stock
                                if (err) throw err.message;
                                
                            })
                            if (result[j].stock_quantity < 0) {                                                         // updated stock when stock is negative
                                connection.query(`UPDATE products SET stock_quantity=0, saleratio= saleratio + ${orders[i].order_quantity}  WHERE product_id=${result[j].product_id}`, async function (err, result) {
                                    if (err) throw err.message;
                                })
                            }
                        } else {
                            console.log("out of stock", orders[i].product_id, result[j].author, " - ", result[j].title)
                        }
                    }
                }
            }
            campain.push({ totalPrice: sumPrice })

            campaign.campaign().then(res => {

                for (i = 0; i < res.length; i++) {
                    for (j = 0; j < baskets.length; j++) {
                        if (res[i].author === baskets[j].author) {                                    // belirtilen yazarın kampanyası
                            if (baskets[j].order_quantity >= res[i].campain_dis) {
                                isJoin = true                                                      // 2 kitabınan 1 i bedava
                                sumPrice -= parseFloat(baskets[j].list_price)
                                campain.push({ dicountPrice: parseFloat(baskets[j].list_price), discountName: "2 al 1 öde kampanyası" })
                            }
                        } else {
                            if (sumPrice >= discount_limit && isJoin == false) {                    // 100 tl üzeri *0.05 indirim ( %5)  ordder list detail ekle 
                                campain.push({ dicountPrice: sumPrice * res[i].campain_ratio, discountName: "%5 indirim kampanyası" })
                                sumPrice -= sumPrice * res[i].campain_ratio
                            }
                        }
                    }
                }
            }).catch((err) => { console.log(err.message) })

            orderindex(sumPrice, baskets).then((index) => {     //order id detect

                if (sumPrice >= freeShiping) {      //shipping control                                                 
                    const shiping = "Free Shipping"
                    resolve({ sumPrice, index, shiping });
                    connection.query(`UPDATE ordersdb SET priceAll=${parseFloat(sumPrice)}, 
                    shippingCost=${0}, dicountPrice=${campain[1]["dicountPrice"]}, 
                    discountName=${JSON.stringify(campain[1]["discountName"])},
                    withoutdiscount=${campain[0]["totalPrice"]} WHERE orderId=${index}`, async function (err, result) {
                        if (err) throw err.message;
                    })
                } else {
                    const shiping = "35₺ shipping fee added"
                    sumPrice += shipping
                    resolve({ sumPrice, index, shiping });
                    if (JSON.stringify(campain).includes("dicountPrice")) {
                        connection.query(`UPDATE ordersdb SET priceAll=${parseFloat(sumPrice)}, shippingCost=${shipping}, dicountPrice=${campain[1]["dicountPrice"]}, discountName=${JSON.stringify(campain[1]["discountName"])}, withoutdiscount=${campain[0]["totalPrice"]} WHERE orderId=${index}`, async function (err, result) {
                            if (err) throw err.message;
                        })
                    } else {
                        connection.query(`UPDATE ordersdb SET priceAll=${parseFloat(sumPrice)}, shippingCost=${shipping}, dicountPrice=${0}, discountName="İndirim yoktur", withoutdiscount=${campain[0]["totalPrice"]} WHERE orderId=${index}`, async function (err, result) {
                            if (err) throw err.message;
                        })
                    }
                }
            }).catch((err) => { console.log(err) })
        });
    })
}

module.exports = orderProcess



