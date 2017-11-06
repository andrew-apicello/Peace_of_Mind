const express = require('express')
const router = express.Router()
const User = require('../../db/models/user')
const passport = require('passport')
const Patient = require('../../db/models/patients')
const Reminder = require('../../db/models/reminders')

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
	console.log("Getting reminders route")
	  Patient.find({_id:patientId}).then(function(patient) {
	  	console.log("current patient: " + patient);
	  	reminderId = patient[0].reminders;
	  	console.log("reminderID" + reminderId);

	  Reminder.find({_id: reminderId}).then(function(reminders) {
	    res.json(reminders);
	  }).catch(function(err) {
	    res.json(err);
	  })
	})
})

router.get('/patients', (req, res) => {
  Patient.findOne({}).then(function(patients) {
    res.json(patients);
  }).catch(function(err) {
    res.json(err);
  })
})


router.get('/reminders', (req, res) => {
  Reminder.find({}).then(function(reminders) {
    res.json(reminders);
  }).catch(function(err) {
    res.json(err);
  })
})

router.get('/reminders/:day', (req, res) => {
  let today = req.params.day;
  Reminder.find({dayToComplete: today}).then(function(reminders) {
    res.json(reminders);
  }).catch(function(err) {
    res.json(err);
  })
})

router.get('/reminders/:day/:time/:phone', (req, res) => {
  let today = req.params.day;
  let time = req.params.time;
  let phone = req.params.phone;
  Reminder.find({dayToComplete: today, timeToComplete: time}).then(function(reminders) {
    console.log(reminders);
    res.json(reminders);


	  // for (let i = 0; i < reminders.length; i++) {
	  //   let text = reminders[i].reminderMessage
	  //   console.log(text);
	  //   console.log(phone);
	  //   client.messages.create({
	  //       body: text,
	  //       to: "+1" + phone,  // Text this number
	  //       from: '+14848123347' // Our valid Twilio number
	  //   })
	  //   // Log that the message was sent.
	  //   .then((message) => console.log(message.sid));
	  //   }

  }).catch(function(err) {
    res.json(err);
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

	const newReminder = new Reminder ({
		reminderTitle: reminderTitle,
		dayToComplete: dayToComplete,
		timeToComplete: timeToComplete,
		medicationQuantity: medicationQuantity,
		medicationRefillDate: medicationRefillDate,
		reminderMessage: reminderMessage
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



module.exports = router