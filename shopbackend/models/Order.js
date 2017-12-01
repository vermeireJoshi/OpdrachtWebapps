var mongoose = require('mongoose');
var Product = require('./Product');

var OrderSchema = new mongoose.Schema({
    products: [{
        id: {type: mongoose.Schema.Types.ObjectId, ref:'Product'},
        amount: Number
    }],
});

module.exports = mongoose.model('Order', OrderSchema);