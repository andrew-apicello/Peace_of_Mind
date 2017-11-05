const express = require('express')
const router = require("express").Router();
const controller = require("../../db/controllers/controller");
const Patient = require('../../db/models/patients')

// THIS DOESN'T WORK, SEE PASSPORT/AUTH/INDEX.JS FOR CURRENT ROUTES

router.post("/addMedication", (req, res) => {
	// const { caretakerName, caretakerPhone, caretakerEmail, patientName, patientPhone } = req.body
	// 	const newPatient = new Patient({
	// 		caretakerName: caretakerName,
	// 		caretakerPhone: caretakerPhone,
	// 		caretakerEmail: caretakerEmail,
	// 		patientName: patientName,
	// 		patientPhone: patientPhone
	// 	})
	// 	newPatient.save((err, savedPatient) => {
	// 		if (err) return res.json(err)
	// 		return res.json(savedPatient)
	// 	})
	});



module.exports = router;


