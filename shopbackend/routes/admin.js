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
    var errormessage = "";
    if(err) {
        errormessage = "ERROR: " + err.message;
    }
    if (custom) {
        errormessage = errormessage + " CUSTOM: " + custom;
    }
    console.log(errormessage);
    return next(err);
}

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

router.post('/get/users', auth, function(req, res, next) {
    User.find({}).select('username')
        .exec(function(err, users) {
            if(err) { handleError(next, err); }
            if(!users) { handleError(next, null, "No users"); }
            return res.json(users);
    });
});

router.post('/add/product', auth, function(req, res, next) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) { return handleError(next, err); }
        if (!user) { return handleError(next, null, "No user"); }
        console.log(user);
        if (user.role && user.role === 'admin') {
            var newProduct = new Product({
                name: req.body.product.name,
                category: req.body.product.category,
                description: req.body.product.description,
                price: +req.body.product.price,
            });

            if(req.body.product.image) {
                var image = {
                    filename: req.body.product.image.filename,
                    filetype: req.body.product.image.filetype,
                    value: req.body.product.image.value,
                };

                newProduct.image = image;
            }

            newProduct.save(function(err) {
                if(err) { return handleError(next, err); }
            });

            return res.json(newProduct);
        }
        
        return res.json("");
    });
});

router.post('/check', auth, function(req, res, next) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) { return handleError(next, err); }
        if (!user) { return handleError(next, null, "No user"); }
        if (user.role && user.role === 'admin') {
            return res.json("isAdmin");
        } else {
            return res.json("isNoAdmin");
        }
    });
});

module.exports = router;
