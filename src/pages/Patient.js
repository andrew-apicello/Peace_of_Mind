import React from 'react'
import ReminderForm from '../components/ReminderForm'
import PatientProfile from '../components/PatientProfile'
// import Clock from "../components/Clock";

const Patient = props => {
	if (props.user) {
		return (
			<div>
				<p>Your Patient:</p>
				<PatientProfile />
				<p>Add a reminder:</p>
				<ReminderForm />
			</div>
		)
	} else {
		return (
			<div>
				<p>Please add a patient before adding a reminder</p>
			</div>
		)
	}
}

export default Patient