const express = require('express')

const connection = require('./db/db')

const bestSales = require('./services/getBestsales')

const getAllbooks = require('./services/getAllbooks')

const orderProcess = require('./services/orders')

const config = require('./config/config')

const createtables = require('./models/createTables')

const insertTables = require('./models/insertTables')

const app = express()

app.use(express.json())

app.listen(3000) 

app.get('/', (req,res)=>{
    bestSales(res)  
})

app.get('/createtables/:id', (req,res) => {
    const pages = req.params.id
    switch (pages) {
        case "products":
            createtables.createProductsTable(res)
            res.send(`Empty Products Table created. You can use post methot on this endpoint with product json object. etc: [{"product_id": 1,"title": "İnce Memed","category_id": 1,"category_title": "Roman","author": "Yaşar Kemal","list_price": 48.75,"stock_quantity": 10}`)
            break;
        case "orders":
            createtables.createOrdersTable(res)
            res.send("Empty Orers Table created")
            break;
        
        case "campaign":
            createtables.createCampaignTable(res)
            res.send("Empty Campaign Table created")
            break;
        default:
            break;
    }
  })

  app.post('/createtables/:id', (req,res) => {
    const pages = req.params.id
    const data = req.body
   
    switch (pages) {
        case "products":
            insertTables.insertProducts(data)
            res.send(`The products insert to table.`)
            break;
    
        case "campaign":
            insertTables.insertCampaigns(data) 
            res.send("Campaign insert to table.")
            break;
        case "orders":
            insertTables.insertOrders(data) 
            res.send("Orders insert to table.")
            break;
        default:
            break;
    }
  })

app.get('/allbooks',(req,res) => {
  getAllbooks(res) 
})

app.post('/orders',async(req,res) => {                      // create order 
    const orders = req.body
    orderProcess(orders).then((result)=>{
        res.send({"Total Price":JSON.stringify(result["sumPrice"]), 
                  "Order ID":JSON.stringify(result["index"]),
                  "Shipping":result["shiping"],
                  "description":"Please keep your Order ID" })
    })
    .catch((err)=>{console.log(err)})
    
})

app.get('/order/:id',(req,res) => {                         // order page login vith local username and password
    const id = req.params.id
    if(req.body.username === config.username &&  req.body.password === config.password){  // validation
        connection.connect(function (err) {
            if (err) throw err;
            connection.query(`SELECT * FROM ordersdb WHERE orderId=?`,[id], function (err, result) {
                if (err) throw err.message;
                res.send(result)
            })
        })
    }else{
        res.send("Username or Password is invalid")
    }
   
  })