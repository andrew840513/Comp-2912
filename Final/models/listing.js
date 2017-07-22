var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var listingSchema = new Schema({
    name: String,
    type: String,
    address: String,
    price: String,
    rentalAllowed: String,
    description: String,
    createdOn: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Listing', listingSchema);