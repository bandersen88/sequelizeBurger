var express = require("express");
var db = require("./models");

// Use for Heroku Deployment
var PORT = process.env.PORT || 3000;
// var PORT = 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// What's the difference between these two definitions?
// 1)
// var routes = require("./controllers/burgers_controller.js");
// app.use(routes);

// 2)
require("./controllers/burgers_controller.js")(app);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
