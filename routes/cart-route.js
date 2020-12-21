const db = require("../models");
const passport = require("../config/passport");
const router = require("express").Router();
const fs = require("fs");
const dotenv = require("dotenv").config();
const axios = require("axios");

router.get("/api/cart", function (req, res) {
  db.Cart.findAll({})
  .then(function (listing) {
    res.json(listing);
  });
});

router.post("/api/add-to-cart/", function (req, res) {
  db.Cart.create({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,    
    category: req.body.category,
    url: req.body.url
  })
    .then(function (results) {
      res.json(results);
    })
    .catch(function (err) {
      console.log(err);
    });
});

module.exports = router;