var express = require('express');
var router = express.Router();
var Listing = require('../models/listing');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Add listing' });
});

router.get('/display', function(req, res, next) {
  res.render('display', { title: 'Display listing' });
});

/*REST API */
router.get('/api/listings', function(req, res){
    Listing.find({}, function(err, listings) {
        res.json(listings);
    })
});

router.post('/api/listings', function(req, res){
   console.log(req.body);

   //Perform validation and return an error for missing data
   if (!req.body.name || !req.body.type || !req.body.address) {
       return res.status(400).json({msg : "Invalid body"});
   }

   var listing = new Listing(req.body);
   listing.save(function(err){
        res.json({msg: "success"});
   });      
});
module.exports = router;
