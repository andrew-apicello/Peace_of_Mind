const express = require('express')
const router = express.Router()
const User = require('../../db/models/user')
const passport = require('passport')
const Patient = require('../../db/models/patients')
const Reminder = require('../../db/models/reminders')
const moment = require('moment');
//==================================Twilio=========================================
const twilio = require('twilio');
const accountSid = 'AC48ce06d27e69dece3a0702596ee55a08'; // Your Account SID from www.twilio.com/console
const authToken = 'a9d53929a8bf32774108b4644960dba8';   // Your Auth Token from www.twilio.com/console
const client = require('twilio')(accountSid, authToken);


// this route is just used to get the user basic info
router.get('/user', (req, res, next) => {
	console.log('===== user!!======')
	console.log(req.user)
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

router.post(
	'/login',
	function(req, res, next) {
		console.log(req.body)
		console.log('================')
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login')
		const user = JSON.parse(JSON.stringify(req.user)) // hack
		const cleanUser = Object.assign({}, user)
		if (cleanUser.local) {
			console.log(`Deleting ${cleanUser.local.password}`)
			delete cleanUser.local.password
		}
		res.json({ user: cleanUser })
	}
)

router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
})

router.post('/signup', (req, res) => {
	const { email, password, phone, firstName, lastName } = req.body
	// ADD VALIDATION
	User.findOne({ 'local.email': email }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the email: ${email}`
			})
		}
		const newUser = new User({
			'local.email': email,
			'local.password': password,
			"phone": phone,
			"firstName": firstName,
			"lastName": lastName
		})
		newUser.save((err, savedUser) => {
			if (err) return res.json(err)
			return res.json(savedUser)
		})
	})
})


router.get('/patients/:id', (req, res) => {

const id = req.params.id;
let patientID;

  User.find({_id:id}).then(function(user) {
  	patientID = user[0].patients[0];

  Patient.find({_id: patientID}).then(function(patients) {
    res.json(patients);
  }).catch(function(err) {
    res.json(err);
  })
})

})


router.get('/reminders/:patientId', (req, res) => {
const patientId = req.params.patientId;

  Patient.find({_id:patientId}).then(function(patient) {
  	reminderId = patient[0].reminders;

  Reminder.find({_id: reminderId}).then(function(reminders) {
    res.json(reminders);
  }).catch(function(err) {
    res.json(err);
  })
 })
})


router.get('/reminders/:patientId/:day', (req, res) => {
console.log("Getting reminders/id/day route")
const patientId = req.params.patientId;
const today = req.params.day;
console.log(patientId);

console.log("Getting reminders route")
  Patient.find({_id: patientId}).then(function(patient) {
  	// console.log("current patient: " + patient);
  	reminderId = patient[0].reminders;
  	console.log("reminderID" + reminderId);

  Reminder.find({_id: reminderId, dayToComplete: today}).then(function(reminders) {
    res.json(reminders);
  }).catch(function(err) {
    res.json(err);
  })
 })
})



router.post("/addPatient", (req, res) => {
	const caretakerId = req.body._id;
	const { patientName, patientPhone, patientStreet, patientCity, patientState, patientZip } = req.body

	const newPatient = new Patient({
		patientName: patientName,
		patientPhone: patientPhone,
		patientStreet: patientStreet,
		patientCity: patientCity,
		patientState: patientState,
		patientZip: patientZip
	})
	newPatient.save((err, savedPatient) => {
		if (err) return res.json(err)
	})

	.then(function(dbPatient) {
	return User.findOneAndUpdate({_id: caretakerId}, { $push: { patients: dbPatient._id } }, {new:true});
    }).then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    })
});


router.post("/addReminder", (req, res) => {
	const patientId = req.body._id;
	const { reminderTitle, dayToComplete, timeToComplete, medicationQuantity, medicationRefillDate, reminderMessage } = req.body

	// Need to calculate 30 minutes from timeToComplete to get the time of when we should receive a response by
	// Since the inputted minutes will either be 0 or 30, we can check for those numbers and set them appropriately
	// First, split the time and remove the colon upon splitting
	const timeArray = timeToComplete.split(":")
	// Then loop through the new array and parseInt each of the items
	let timeNumbers = [];
	for (let i = 0; i < timeArray.length; i++) {
		// push the numbers into a new array
		let numbers = parseInt(timeArray[i])
		timeNumbers.push(numbers);
	}

	// Then check if the second item in the array, which should be the minutes, is 0 or 30
	let hours = timeNumbers[0];
	let minutes = timeNumbers[1];
	console.log("current minutes: " + minutes);
	let newMinutes;
	
	// Set the new minutes
	if (minutes === 0) {
		newMinutes = "30";
		console.log("newMinutes: " + newMinutes)
	} else if (minutes === 30) {
		newMinutes = "00";
		hours++;
		console.log("newMinutes: " + newMinutes)
		console.log("newhours: " + hours)
	}

	// Then, concatenate the two back together and send into db with a colon in between 
	let receiveResponseBy = hours + ":" + newMinutes;
	console.log("receiveREsponseby: " + receiveResponseBy)

	const newReminder = new Reminder ({
		reminderTitle: reminderTitle,
		dayToComplete: dayToComplete,
		timeToComplete: timeToComplete,
		medicationQuantity: medicationQuantity,
		medicationRefillDate: medicationRefillDate,
		reminderMessage: reminderMessage,
		receiveResponseBy: receiveResponseBy
	})
	newReminder.save((err, savedReminder) => {
		if (err) return res.json(err)
	})

	.then(function(dbReminder) {
	return Patient.findOneAndUpdate({_id: patientId}, { $push: { reminders: dbReminder._id } }, {new:true});
    }).then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    })

});



// Logic to text/receive/update reminders
clock = () => {
	// Get the current minute
	let minutes = moment().format('mm');

	if(minutes == 00 || minutes == 30) {
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
	let time = moment().format('HH:mm');
	let thirtyMinutesFromNow = moment().add(30, 'minutes').format('HH:mm');
	console.log("current time: " + time);
	console.log("day: " + day);
	console.log("30 minutes from now: " + thirtyMinutesFromNow);


	Patient.find({}).then(function(patients) {

		// Loop through all of the patients information in the db
		for (let i = 0; i < patients.length; i++) {
			// Get the patient's phone and all of their reminders
			let currentPatient = patients[i];
			let patientPhone = currentPatient.patientPhone;
			let remindersArray = currentPatient.reminders;

			// Loop through each of the patient's reminders and get the reminderId
			for (let j = 0; j < remindersArray.length; j++) {
				let reminderId = remindersArray[j];


				//***** ADD IN TIME TO QUERY!!!! USING WITHOUT FOR TESTING PURPOSES ***** //


				// Query into db to find the id of each reminder based on what day and time it is as well as if the responseReceived = false
				Reminder.find({_id: reminderId, dayToComplete: day, responseReceived: false, responseLate: false}).then(function(reminders) {
					// console.log(reminders + " " + patientPhone);
					for (let i = 0; i < reminders.length; i++) {
						// Get the body of the reminderMessage. Can also get the reminder photo
						let textMessage = reminders[i].reminderMessage;
						let pictureUrl = reminders[i].reminderImage;

					console.log(textMessage + " " + patientPhone);


					// ********* THIS WORKS! *********

					// Text the patients. 
					// If the pictureUrl is true, send a picture text message
					// Else send a regular text message without a picture

					// if(pictureUrl) {
					// client.messages
					//   .create({
					//     to: '+1' + patientPhone, // Text this number
					//     from: '+14848123347', // Our valid Twilio number
					//     body: textMessage,
					//     mediaUrl: pictureUrl,
					//   })
					//   .then(message => console.log(message.sid));
					// } else { 
				 //    client.messages.create({
				 //        body: textMessage + " Please respond 'YES' when finished.",
				 //        to: "+1" + patientPhone,  // Text this number
				 //        from: '+14848123347' // Our valid Twilio number
				 //    })
				 //    // Log that the message was sent.
				 //    .then((message) => console.log(message.sid));
				 //  }


				 // ********* NEXT STEPS *********

				    // Then, we query all users, get their phone numbers
				    // Loop through their patients, get their IDs 
				    // Find the reminders of that patient with the receiveResponseBy = thirtyMinutesFromNow and if responseReceived = false
				    // If response received = false, then we send a text message to the user alerting that the patient's 12:00 or so reminder hasn't been completed
				    // Update reminder in db as responseLate = true

				    // If a response has been received, we need to get the phone number that it's coming from. 
				    // Query all patients where the phone number matches and somehow find which reminder they were responding to. 
				    // Maybe we get the time the 'YES' was sent and say if it is less than receiveResponseBy then update that responseReceived to true
					}
				})

			}

		}

	})

}


module.exports = router;