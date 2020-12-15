const db = require("../models");
const passport = require("../config/passport");
const router = require("express").Router();

require("dotenv").config();

//API Key not is use yet possibly for Walmart API
const apiKey = process.env.API_KEY;
console.log(apiKey);

//GET user information to be used
router.get("/api/user_data", function (req, res) {
 //If user not logged in return empty string
  if (!req.user) {
    res.json({});
  } else {
   //Else send their information
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  }
});

//Returns Listings table information
router.get("/api/listings", function (req, res) {
  db.Listing.findAll({}).then(function (listing) {
    res.json(listing);
  });
});

//Post a listing to Listing table in db
router.post("/api/listings", function (req, res) {
  db.Listing.create(req.body).then(function (listing) {
    res.json(listing);
  });
});

//Posts User information through Sign Up form
router.post("/api/signup", function (req, res) {
  db.User.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then(function () {
      res.redirect(307, "/api/login");
    })
    .catch(function (err) {
      res.status(401).json(err);
    });
});

//Checks if login information is valid returns user information
router.post("/api/login", passport.authenticate("local"), function (req, res) {
  res.json(req.user);
});

module.exports = router;
