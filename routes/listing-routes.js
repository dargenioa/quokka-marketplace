const db = require("../models");
const passport = require("../config/passport");
const router = require("express").Router();
const fs = require("fs");
const dotenv = require("dotenv").config();
const axios = require("axios");

//API Key not is use yet possibly for Walmart API
const apiKey = process.env.API_KEY;
console.log(apiKey);

// router.get("/api/test/:item", function (req, res) {
//   var queryURL = `https://api.walmartlabs.com/v1/search?apiKey=${process.env.API_KEY}&query=${req.params.item}`;
//   axios
//     .get(queryURL)
//     .then(function (response) {
//       // handle success
//       const firstItem = response.data.items[0];
//       const listingData = {
//         name: firstItem.name,
//         price: firstItem.msrp,
//         quantity: 10,
//         category: "Electronics",
//         url: firstItem.largeImage,
//         //remove hard-coded userid when necessary
//         UserId: 1
//       };
//       db.Listing.create(listingData).then(function (data) {
//         res.json(data);
//       });
//       // console.log(response.data);
//       // res.json(response.data);
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     });
// });

router.get("/api/listings", function (req, res) {
  let query = {};
  if (req.query.user_id) {
    query.UserId = req.query.user_id;
  }
  // if(req.User){
  //   q
  // }
  console.log(req.query);
  console.log(query);
  // Here we add an "include" property to our options in our findAll query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Listing
  db.Listing.findAll({
    where: query,
    include: [db.User]
  }).then(function(dbListing) {
    res.json(dbListing);
  });
});

// Get route for retrieving a single post
router.get("/api/listings/:id", function (req, res) {
  // Here we add an "include" property to our options in our findOne query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.User
  db.Listing.findOne({
    where: {
      id: req.params.id,
    },
    include: [db.User],
  }).then(function (dbListing) {
    res.json(dbListing);
  });
});

// //Returns Listings table information
router.get("/api/listings", function (req, res) {
  db.Listing.findAll({
    include: {
      models: db.User,
    }
  }).then(function (listing) {
    res.json(listing);
  });
});

//Post a listing to Listing table in db
router.post("/api/listings/new", function (req, res) {
  db.Listing.create({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category,
    UserId: req.user.id || req.body.UserId
  })
    .then(function () {
      res.redirect("/profile");
    })
    .catch(function (err) {
      console.log(err);
    });
  //console.log(req.user);
});


//NEW Listing Post to /api/listings includes

//Formidable handles form information
//Its used to get the file path and body info
const Formidable = require("formidable");
//Cloudinary allows for uploads to it's cloud service
const cloudinary = require("cloudinary");

//Configure cloudinary resource
//Need to make a cloudinary account for the .env file
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//Post to cloudinary
router.post("/api/listings", (req, res) => {
 //Init Form 
 let form = new Formidable();
  //Save the file inside cloudinary
  //Handles file upload
  let pictureURL;
  //Pass req parameter and Callback function for inputs and image file
  form.parse(req, async (err, fields, files) => {
   //Send Path through cloudinary it returns a url 
   cloudinary.uploader
      .upload(files.upload.path, (result) => {
        //The info about the image
        // console.log(result);
        pictureURL = result.secure_url;
      })
      .then(function () {
       //Then create a listing with information
        db.Listing.create({
          name: fields.name,
          price: fields.price,
          quantity: fields.quantity,
          category: fields.category,
          UserId: req.user.id,
          url: pictureURL,
        })
          .then(function () {
            res.redirect("/profile");            
          })
          .catch(function (err) {
            console.log(err);
          });
      });
  });
});


router.put("/api/listings/:id", function(req,res){
  console.log("yo");
  
  db.Listing.update(
    req.body,
    {
      where: {
        id: req.params.id
      }
    }).then(function(dbListing) {
      console.log(dbListing);
    res.json(dbListing);
  });
});

router.delete("/api/listings/:id", function(req,res){
  db.Listing.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbListing) {
    res.json(dbListing);
  });
});
module.exports = router;
