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

//Serve Public Folder
app.use(express.static("public"));


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

const accountSid = 'AC48ce06d27e69dece3a0702596ee55a08'; // Your Account SID from www.twilio.com/console
const authToken = 'a9d53929a8bf32774108b4644960dba8';   // Your Auth Token from www.twilio.com/console

const client = require('twilio')(accountSid, authToken);

let minutes;
clock = () => {
	// Get the current minute
	minutes = moment().format('mm');

	if(minutes == 00 || minutes == 30) {
		console.log(minutes);
		// Query the db to check for tasks every 0 and 30 minutes 
		queryDB();
	}
}

// Run the clock function every minute
setInterval(clock, 60000);

let day;
switch (new Date().getDay()) {
    case 0:
        day = "Sunday";
        break;
    case 1:
        day = "Monday";
        break;
    case 2:
        day = "Tuesday";
        break;
    case 3:
        day = "Wednesday";
        break;
    case 4:
        day = "Thursday";
        break;
    case 5:
        day = "Friday";
        break;
    case 6:
        day = "Saturday";
}



// Go into DB and find all reminders on a specified day and time and get patient phone and task to be texted
queryDB = () => {
	// Get the full current time to compare with DB
	let time = moment().format('H:mm');
	console.log(time);
	console.log(day);
	// First we need to populate all patients with their reminders
	
	// // Find all patients with reminders that are related to the specified day and time
	// db.Reminders.find({dayToComplete:day, timeToComplete:time}, function(err, data) {
 //      res.json(data);
	//       for (let i = 0; i < data.length; i++) {
	//       	let patientPhone = data[i].patientPhone;
	//       	let reminderMessage = data[i].message;

	//       	// If the reminder includes a picture, send a picture message
	//       	if(data[i].pic) {
	//       		let reminderImage = data[i].pic;
	// 						client.messages
	// 						  .create({
	// 						    to: patientPhone,
	// 						    from: '+14848123347',
	// 						    body: reminderMessage,
	// 						    mediaUrl: reminderImage
	// 						  })
	// 						  // Log that the message was sent.
	// 						  .then(message => console.log(message.sid));
	//       	} 
	//       	// Else, send a regular text message, with no picture
	//       	else {
	// 					client.messages.create({
	// 					    body: reminderMessage,
	// 					    to: patientPhone,  // Text this number
	// 					    from: '+14848123347' // Our valid Twilio number
	// 					})
	// 					// Log that the message was sent.
	// 					.then((message) => console.log(message.sid));
	//       	}
	//       }
 //  	});
}



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


