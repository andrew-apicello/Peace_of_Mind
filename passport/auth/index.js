const express = require('express')
const router = express.Router()
const User = require('../../db/models/user')
const passport = require('passport')
const Patient = require('../../db/models/patients')
const Reminder = require('../../db/models/reminders')

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