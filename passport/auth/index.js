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
	const { username, password, phone, email } = req.body

	console.log(email);
	console.log(req.body.email)
	// ADD VALIDATION
	User.findOne({ 'local.username': username }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the username: ${username}`
			})
		}
		const newUser = new User({
			'local.username': username,
			'local.password': password,
			'phone': phone,
			'email': email
		})
		newUser.save((err, savedUser) => {
			if (err) return res.json(err)
			return res.json(savedUser)
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


	  for (let i = 0; i < reminders.length; i++) {
	    let text = reminders[i].reminderMessage
	    console.log(text);
	    console.log(phone);
	    client.messages.create({
	        body: text,
	        to: "+1" + phone,  // Text this number
	        from: '+14848123347' // Our valid Twilio number
	    })
	    // Log that the message was sent.
	    .then((message) => console.log(message.sid));
	    }


  }).catch(function(err) {
    res.json(err);
  })
})


router.post("/addPatient", (req, res) => {
	const caretakerId = req.body._id;
	const { patientName, patientPhone, patientAddress } = req.body

	const newPatient = new Patient({
		patientName: patientName,
		patientPhone: patientPhone,
		patientAddress: patientAddress
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

module.exports = router;