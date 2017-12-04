var express = require('express');
var router = express.Router();
var User = require('../models/User');
let passport = require('passport');

function handleError(next, err, custom) {
  var errormessage = "ERROR: " + err.message;
  if(custom) {
    errormessage = errormessage + " | CUSTOM: " + custom;
  }
  console.log(errormessage);
  return next(err);
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
      handleError(next, "Not all fields filled out");
  }

  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.role = 'customer';
  user.orders = [];
  user.likes = [];

  user.save(function (err){
      if(err) { return handleError(next, err); }
      return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
      return res.status(400).json({message: 'Not all fields filled out'});
  }

  passport.authenticate('local', function(err, user, info) {
    console.log(err + "  " + user + "  " + info);

    if(err) { return handleError(next, err); }
    if(user) {
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.post('/checkusername', function(req, res, next) {
  User.find({username: req.body.username}, 
    function(err, result) {
      if (result.length) {
        res.json({'username': 'alreadyexists'})
      } else {
        res.json({'username': 'ok'})
      }
  });
});

module.exports = router;
