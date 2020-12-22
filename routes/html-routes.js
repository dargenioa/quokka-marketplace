const path = require("path");
const router = require("express").Router();
const authenticated = require("../config/middleware/authenticated");

//Upon Entry to site
router.get("/", function (req, res) {
  if (req.user) {
    res.redirect("/home");
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

router.get("/edit-listing", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/edit-listing.html"));
});

//Send User to signup.html
router.get("/signup", function (req, res) {
  if (req.user) {
    res.redirect("/home");
  }
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

//GET to home checks to see if logged in send to home if no errors
router.get("/home", authenticated, function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//Cart Route
router.get("/cart", function (req, res) {
  if (!req.user) {
    res.redirect("/login");
  }
  res.sendFile(path.join(__dirname, "../public/cart.html"));
});

//Add listing Route
router.get("/add-listing", function (req, res) {
  if (!req.user) {
    res.redirect("/home");
  }
  res.sendFile(path.join(__dirname, "../public/addListing.html"));
});

router.get("/profile", authenticated, function (req, res) {
  res.sendFile(path.join(__dirname, "../public/profile.html"));
});

router.get("/cart", authenticated, function (req, res) {
  res.sendFile(path.join(__dirname, "../public/cart.html"));
});

//Export router
module.exports = router;
