const express = require("express");
const htmlRoutes = require("./routes/html-routes");
const apiRoutes = require("./routes/api-routes");
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
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use(apiRoutes);
app.use(htmlRoutes);

//Multer
global.__basedir = __dirname;

//Sequelize
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log(`App listening on PORT ${PORT}`);
  });
});
