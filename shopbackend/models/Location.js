var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    name: String,
    location: String
});

module.exports = mongoose.model('Location', LocationSchema);