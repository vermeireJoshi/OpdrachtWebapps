var express = require('express');
var router = express.Router();
var User = require('../models/User');
let passport = require('passport');
let jwt = require('express-jwt');
let auth = jwt({ secret: process.env.SECRET, userProperty: 'payload' });

var Product = require('../models/Product');
var Order = require('../models/Order');
var User = require('../models/User');

function handleError(next, err, custom) {
    var errormessage = "ERROR: " + err.message;
    if (custom) {
        errormessage = errormessage + " | CUSTOM: " + custom;
    }
    console.log(errormessage);
    return next(err);
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/init', function (req, res, next) {
    User.findOne({
        Username: 'admin'
    }, function (err, admin) {
        if (!admin) {
            var newAdmin = new User();
            newAdmin.username = 'admin';
            newAdmin.setPassword('admin');
            newAdmin.role = 'admin';
            newAdmin.orders = [];
            newAdmin.likes = [];

            newAdmin.save(function (err) {
                if (err) {
                    return handleError(next, err);
                } else {
                    return res.json('Admin added');
                }
            });
        } else {
            return res.json('Admin already exists');
        }
    });
});

router.post('/add/product', function (req, res, next) {
    User.findOne({
        Username: req.body.username
    }, function (err, user) {
        if (err) { handleError(next, err.message); }
        if (!user) { handleError(next, "No user"); }
        if (user.role && user.role === 'admin') {
            console.log("admin");
        }
        res.send('Got admin succesfull');
    });
});

module.exports = router;
