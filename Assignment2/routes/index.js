var express = require('express');
const price = require('./PriceCalculator');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index',{title: "Assignment 2"});
});


module.exports = router;
