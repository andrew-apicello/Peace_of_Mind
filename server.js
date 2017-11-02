const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
// var db = require("./db/models/user");
const PORT = process.env.PORT || 3001;
const twilio = require('twilio');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport')
const dbConnection =require ('./db');;

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
  mongoose.connect("mongodb://localhost/pillbox", {
    useMongoClient: true
  });
  console.log("connected locally");
}


//==================================Twilio=========================================

const accountSid = 'AC48ce06d27e69dece3a0702596ee55a08'; // Your Account SID from www.twilio.com/console
const authToken = 'a9d53929a8bf32774108b4644960dba8';   // Your Auth Token from www.twilio.com/console

const client = require('twilio')(accountSid, authToken);

//==================================Send Twilio Text=========================================

// client.messages.create({
//     body: 'Hello from Node',
//     to: '+19087631304',  // Text this number
//     from: '+14848123347' // Our valid Twilio number
// })
// .then((message) => console.log(message.sid));

//==================================Send Twilio Image Text=========================================

// client.messages
//   .create({
//     to: '+19087631304',
//     from: '+14848123347',
//     body: '10:00AM: Take these pills. Reply "YES" after you take them.',
//     mediaUrl: 'https://www.wareable.com/media/images/2016/03/pills-closeup-1459347869-F998-column-width-inline.jpg',
//   })
//   .then(message => console.log(message.sid));


//==================================Twilio Respond to Text=========================================

// const MessagingResponse = require('twilio').twiml.MessagingResponse;

// app.post('/sms', (req, res) => {
//   const twiml = new MessagingResponse();

//   twiml.message('Great!');

//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });

// ===== Middleware ====
app.use(logger('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

// +++++++===== Passport ====+++++++
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser



app.use('/auth', require('./passport/auth'));


// // Main "/" Route. This will redirect the user to our rendered React application
// app.get("*", function(req, res) {
//   res.sendFile(__dirname + "/build/static/index.html");
// });


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});


