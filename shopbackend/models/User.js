var mongoose = require('mongoose');
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
var Order = require('./Order');
var Product = require('./Product');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  hash: String,
  salt: String,
  orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(32).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
  return this.hash === hash;
}

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
      _id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000)
  }, process.env.SECRET);
}

module.exports = mongoose.model('User', UserSchema);
