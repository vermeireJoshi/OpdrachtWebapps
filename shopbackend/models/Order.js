var mongoose = require('mongoose');
var Product = require('./Product');

var OrderSchema = new mongoose.Schema({
    products: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref:'Product'},
        amount: Number
    }],
    date: Date,
    totalPrice: Number,
});

module.exports = mongoose.model('Order', OrderSchema);