const fs = require('fs');
const price = require('./PriceCalculator');
var express = require('express');
var router = express.Router();
var pizzaJson = require('./pizza.json');
var Order = require('../models/Order');
let orders = [];
let orderID = 100000;
router.get('/', function(req, res, next) {
    res.render('confirmation', {title : "Assignment 1"});
});
router.post('/', function(req, res){
    var orderJSON = req.body;
    var order = new Order(orderJSON);
    orderID++;

    price.setJSONData(pizzaJson);
    price.setOrderData(orderJSON);
    return res.json({orderID:orderID, order:order, price:price.getTotal()});
});

router.post('/success',function(req, res){
    var day = new Date();
    var orderNumber = day.getTime();
    
    fs.access('order.json', fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if(err){
            var order = {};
            order[orderNumber] = JSON.parse(req.body["JSON"]);
            fs.writeFile('order.json', JSON.stringify(order), (err)=> {
                if(err) throw err;
            });
        }else{
            fs.readFile('order.json','utf8',(err, data) =>{
                var order = JSON.parse(data);
                order[orderNumber] = JSON.parse(req.body["JSON"]);
                fs.writeFile('order.json', JSON.stringify(order), (err)=> {
                    if(err) throw err;
                });
            })
        }
    })
    res.sendStatus(200)
});

module.exports = router;