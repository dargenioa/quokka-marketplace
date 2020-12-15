const db = require("../models");
const passport = require("../config/passport");
const router = require("express").Router();
const fs = require("fs");

//might be able to put upload in here

const dotenv = require("dotenv").config();


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

// //Post a listing to Listing table in db
// router.post("/api/listings", function (req, res) {
//   db.Listing.create(req.body).then(function (listing) {
//     res.json(listing);
//   });
// });

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

const upload = require("../config/middleware/upload");

//POST a listing to db
router.post("/uploads", upload.single("file"), async (req, res) => {
  try {
    console.log(req.body.file);

    //Check to see if a file was inserted
    if (req.body == undefined) {
      return res.send(`You must insert data.`);
    }
    //Create a listing
    db.Listing.create({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
      purchased: req.body.purchased,
      //Not sure what this does
      photo: fs.readFileSync(
        __basedir + "/public/assets/uploads/" + req.file.filename
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/public/assets/tmp/" + image.name,
        image.photo
      );

      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
});

module.exports = router;
