const express = require('express');
const htmlRoutes = require('./routes/html-routes');
const apiRoutes = require('./routes/api-routes');
const db = require('./models');


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(apiRoutes);
app.use(htmlRoutes);

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function(){
        console.log(`App listening on PORT ${PORT}`);
    });
});