/**
 * Created by Andrew on 2017-06-30.
 */
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const price = require('./PriceCalculator');
var pizzaJson = require('./pizza.json');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
    price.setJSONData(pizzaJson);
    res.render('index',{title: "Assignment 1", pizzaData: pizzaJson});
});
app.post('/confirmation', function(req, res){
    price.setOrderData(req.body);
    res.render('confirmation', {title : "Assignment 1", pizzaData: pizzaJson, order: req.body, price: price.getTotal(), tax: price.getTax()} );
});

app.post('/success',function(req, res){
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

app.get('*', function(req, res){
    res.redirect('/');
});

app.listen(49999, function() {
   console.log("Success");
});
