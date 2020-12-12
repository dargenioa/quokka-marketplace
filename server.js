const express = require('express');
const session = require('express-session');
const htmlRoutes = require('./routes/html-routes');
const apiRoutes = require('./routes/api-routes');
const db = require('./models');
const passport = require("./config/passport");


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(apiRoutes);
app.use(htmlRoutes);

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function(){
        console.log(`App listening on PORT ${PORT}`);
    });
});