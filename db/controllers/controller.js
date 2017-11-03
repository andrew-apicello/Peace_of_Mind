const db = require("../models");

module.exports = {

	findAll: function(req, res) {
		db.Patients.find({})
		.populate("reminders")
		.then(function(dbReminder) {
			res.json(dbReminder);
			console.log(dbReminder);
		})
		.catch(function(err) {
			res.json(err);
		});
	}

};