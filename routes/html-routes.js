const path = require("path");
const router = require("express").Router();
const authenticated = require("../config/middleware/authenticated");

//Upon Entry to site
router.get("/", function (req, res) {
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

//Upon login
router.get("/login", function (req, res) {
  if (req.user) {
    res.redirect("/home");
  }
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

//Send User to signup.html
router.get("/signup", function (req, res) {
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

//GET to home checks to see if logged in send to home if no errors
router.get("/home", authenticated, function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//Poop Route
router.get("/add-listing", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/addListing.html"));
});

router.get("/members", authenticated, function (req, res) {
  res.sendFile(path.join(__dirname, "../public/members.html"));
});

//Export router
module.exports = router;
