// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments')
	require('dotenv').config()
}
require('dotenv').config()

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const twilio = require('twilio');
const moment = require('moment');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport');
const dbConnection = require('./db');
// const routes = require("./routes");

//Serve Public Folder
app.use(express.static("public"));
// app.use(routes);


//================ MIDDLEWARE ================= //
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

//================ PASSPORT ================= //
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

app.use('/auth', require('./passport/auth'))

// ====== Error handler ====
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})


//==================================Twilio=========================================


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


//==================================Routes=========================================


// // Main "/" Route. This will redirect the user to our rendered React application
// app.get("*", function(req, res) {
//   res.sendFile(__dirname + "/build/static/index.html");
// });


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});


