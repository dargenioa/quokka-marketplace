const db = require("../models");
const passport = require("../config/passport");
const router = require("express").Router();
const fs = require("fs");
const dotenv = require("dotenv").config();

const authenticated = require("../config/middleware/authenticated");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

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

router.get("/api/user", function (req, res) {
  // Here we add an "include" property to our options in our findAll query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Post

  db.User.findAll({
    include: [db.Listing],
  }).then(function (dbUsers) {
    let user;
    for (let i = 0; i < dbUsers.length; i++) {
      if (dbUsers[i].id === req.user.id) {
        user = dbUsers[i];
      }
    }

    res.json(user);
  });
});

//Posts User information through Sign Up form
router.post("/api/signup", function (req, res) {
  db.User.create({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    phoneNumber: req.body.phoneNumber,
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
  console.log("my info ", req.user);
  res.json(req.user);
});

//Logout route
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
