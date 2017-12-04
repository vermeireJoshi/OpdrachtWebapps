var express = require('express');
var router = express.Router();
var fs = require('fs');
let jwt = require('express-jwt');
let auth = jwt({secret: process.env.SECRET, userProperty: 'payload'});

var Product = require('../models/Product');
var Order = require('../models/Order');
var User = require('../models/User');

// Generic error handler used by all endpoints.
function handleError(next, err, custom) {
  var errormessage = "ERROR: " + err.message;
  if(custom) {
    errormessage = errormessage + " | CUSTOM: " + custom;
  }
  console.log(errormessage);
  return next(err);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/init', function(req, res, next) {
  var producten = [];

  var names = ['Stoel', 'Tafel', 'Bed', 'Toilet'];
  var categories = ['Keuken', 'Keuken', 'Slaapkamer', 'Badkamer'];
  var descriptions = ['Een stoel met 4 poten',
    'Een mooie tafel, ook met 4 poten',
    'Goed slapen in een zacht bed',
    'Breng vele uren door op dit royale toilet'
  ];
  var prices = [15.34, 129.99, 399.98, 95.76];

  var filenames = ['Tafel'];
  var filetypes = ['image/jpg'];
  var filevalues = ['/../public/images/tafel.jpg'];

  for(var i = 0; i < names.length; i++) {
    var bitmap = fs.readFileSync(__dirname + filevalues[0]);
    var value = new Buffer(bitmap).toString('base64');

    var newProduct = new Product({
      name: names[i],
      category: categories[i],
      description: descriptions[i],
      price: prices[i],
      image: {
        filename: filenames[0],
        filetype: filetypes[0],
        value: value
      }
    });

    producten.push(newProduct);

    newProduct.save(function(err) {
      if(err) {
        return handleError(next, err, "newProduct");
      }
    });
  }

  return res.json(producten);
});


router.get('/products', function(req, res, next) {
  Product.find(function(err, products) {
      if(err) { return handleError(next, err); }
      return res.json(products);
  });
});

router.get('/categories', function(req, res, next) {
  Product.find(function(err, products) {
    return res.json([...new Set(products.map(item => item.category))]);
  });
});

router.get('/orders/:username', auth, function(req, res, next) {
  User.findOne({
    username: req.params.username
  }).populate({
    path: 'orders',
    model: 'Order',
    populate: {
      path: 'products.product',
      model: 'Product',
      select: ['name', 'price']
    }
  }).exec(function(err, user) {
    if(err) { return handleError(next, err); }
    if(!user) { return handleError(next, "Could not find use"); }

    console.log(user.orders);
    return res.json(user.orders);
  });
});

router.post('/products/order', auth, function(req, res, next) {
  User.findOne({
    username: req.body.user
  }, function(err, user) {
    if(err) { return handleError(next, err); }
    if(!user) { return handleError(next, "Could not find use"); }

    var newOrder = new Order({
      products: [],
      date: new Date(),
      totalPrice: req.body.totalPrice
    });
    for(var i = 0; i < req.body.products.length; i++) {
      var orderItem = {
        product: req.body.products[i].product,
        amount: req.body.products[i].amount
      }
      newOrder.products.push(orderItem);
    }
    console.log(newOrder);

    newOrder.save(function(err) {
      if(err) { return handleError(next, err); }

      user.orders.push(newOrder);
      user.save(function(err) {
        if(err) { return handleError(next, err); }

        return res.json(newOrder);
      });
    });
  });
});

router.get('/likes/:username', auth, function(req, res, next) {
  User.findOne({
    username: req.params.username
  }, function(err, user) {
    if(err) { return handleError(next, err); }
    if(!user) { return handleError(next, "User not found"); }
    console.log(user);
    console.log(user.likes);
    return res.json(user.likes);
  });
});

router.post('/likes/add/:username', auth, function(req, res, next) {
  User.findOne({
    username: req.params.username
  }, function(err, user) {
    if(err) { return handleError(next, err); }
    if(!user) { return handleError(next, "User not found"); }
    
    var index = user.likes.indexOf(req.body.productId);
    if(index < 0) {
      user.likes.push(req.body.productId);
    } else {
      user.likes.splice(index, 1);
    }
    
    user.save(function(err) {
      if(err) { return handleError(next, err); }
      return res.json("Succesful");
    })
  });
});

module.exports = router;
