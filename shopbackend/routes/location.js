var express = require('express');
var router = express.Router();
var User = require('../models/User');
let passport = require('passport');
let jwt = require('express-jwt');

var Location = require('../models/Location');

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
    var newLocations = [];

    let names = ["Korenmarkt", "Campus Schoonmeersen", "Steenstraat", "Nieuwstraat", "Piccadilly Circus"];
    let locations = ["Ghent, Belgium", "Ghent, Belgium", "Bruges, Belgium", "Brussels, Belgium", "London, UK"];
    let lats = [51.054633, 51.0337537, 51.20733543, 50.85312056, 51.5100913];
    let longs = [3.7219431, 3.7012067, 3.22294906, 4.35635671, -0.1345676];

    for(var i = 0; i < names.length; i++) {
        console.log("Adding " + names[i] + " (lat: " + lats[i] + ", long: " + longs[i] + ")");
        var newLocation = new Location({
            name: names[i],
            location: locations[i],
            latitude: lats[i],
            longitude: longs[i]
        });

        newLocations.push(newLocation);

        newLocation.save(function(err) {
            if(err) {
              return handleError(next, err, "newProduct");
            }
        });
    }

    return res.json(newLocations);
});

router.get('/', function(req, res, next) {
    Location.find(function(err, location) {
        if(err) { return handleError(next, err); }
        return res.json(location);
    });
  });

module.exports = router;
