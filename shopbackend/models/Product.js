var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  price: Number,
  image: {
    filename: String,
    filetype: String,
    value: String,
  }
});

module.exports = mongoose.model('Product', ProductSchema);
