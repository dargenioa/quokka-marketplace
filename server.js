const express = require("express");
const htmlRoutes = require("./routes/html-routes");
const userRoutes = require("./routes/user-routes");
const listingRoute = require("./routes/listing-routes");
const db = require("./models");
const passport = require("./config/passport");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 8080;

//Server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Passport
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use(userRoutes);
app.use(listingRoute);
app.use(htmlRoutes);

//Sequelize
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log(`App listening on PORT ${PORT}`);
  });
});
