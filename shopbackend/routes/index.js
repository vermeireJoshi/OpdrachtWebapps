var express = require('express');
var router = express.Router();
var fs = require('fs');
let jwt = require('express-jwt');
let auth = jwt({secret: process.env.RECIPE_BACKEND_SECRET, userProperty: 'payload'});

var Product = require('../models/Product');

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
        handleError(next, err, "newProduct");
      }
    });
  }

  res.json(producten);
});


router.get('/products', function(req, res, next) {
  Product.find(function(err, products) {
      if(err) { handleError(next, err); }
      res.json(products);
  });
});

module.exports = router;
