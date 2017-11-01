var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
// var db = require("./models");
var PORT = process.env.PORT || 3000;


//Configure Middleware
app.use(logger("dev"));//log requests
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static("public"));// serve the public folder


// Connect to the Mongo DB
mongoose.Promise = Promise;
if (process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI);
  console.log("connected remotely");
} else {
  mongoose.connect("mongodb://localhost/beers", {
    useMongoClient: true
  });
  console.log("connected locally");
}


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});


//==================================Routes=========================================

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});




app.get("/all", function(req, res) {
});


