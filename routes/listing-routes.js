const db = require("../models");
const passport = require("../config/passport");
const router = require("express").Router();
const fs = require("fs");
const dotenv = require("dotenv").config();
const axios = require("axios");

//API Key not is use yet possibly for Walmart API
const apiKey = process.env.API_KEY;
console.log(apiKey);

router.get("/api/test/:item", function (req, res) {
  var queryURL = `https://api.walmartlabs.com/v1/search?apiKey=${process.env.API_KEY}&query=${req.params.item}`
  axios.get(queryURL)
    .then(function (response) {
      // handle success
      const firstItem = response.data.items[0];
      const listingData = {
        name: firstItem.name,
        price: firstItem.msrp,
        quantity: 10,
        category: "Electronics",
        url: firstItem.largeImage
      }
      db.Listing.create(listingData)
        .then(function (data) {
          res.json(data);
        })
      // console.log(response.data);
      // res.json(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
});

router.get("/api/listings", function(req, res) {
  
  let query = {};
  if (req.query.user_id) {
    query.UserId = req.query.user_id;
  }
    // if(req.User){
    //   q
    // }
  console.log(req.query)
  console.log(query)
  // Here we add an "include" property to our options in our findAll query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Author
  // db.Listing.findAll({
  //   where: query,
  //   include: [db.User]
  // }).then(function(dbListing) {
  //   res.json(dbListing);
  // });
});

  // Get route for retrieving a single post
 router.get("/api/listings/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Listing.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbListing) {
      res.json(dbListing);
    });
  });

// //Returns Listings table information
// router.get("/api/listings", function (req, res) {
//   db.Listing.findAll({
//     include: {
//       models: db.User,
//     }
//   }).then(function (listing) {
//     res.json(listing);
//   });
// });

//Post a listing to Listing table in db
router.post("/api/listings", function (req, res) {
  const id = 1
  db.Listing.create(
      {
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category,
    UserId: req.user.id
  }
  )
    .then(function (listing) {
      res.json(listing);
    })
    .catch(function(err){
      console.log(err);
    });
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
