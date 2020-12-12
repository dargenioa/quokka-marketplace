const db = require("../models");
const passport = require("../config/passport");
const router = require("express").Router();

router.get("/api/user", function (req, res) {
  if (!req.user) {
    res.json({});
  } else {
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  }
});

router.post("/api/signup", function(req, res) {
    db.User.create({
        email: req.body.email,
        password: req.body.password
    }).then(function(){
        res.redirect(307, "/api/login");
    }).catch(function(err) {
        res.status(401).json(err);
    });
});

router.post("/api/login", passport.authenticate("local"), function (req, res) {
  res.json(req.user);
});

module.exports = router;
