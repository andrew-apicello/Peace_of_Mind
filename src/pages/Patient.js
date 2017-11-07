import React from 'react'
import ReminderForm from '../components/ReminderForm'
import PatientProfile from '../components/PatientProfile'
// import Clock from "../components/Clock";

const Patient = props => {

	let user = props.user || 'no user';
	console.log('props: ', user._id);

	if (props.user) {
		return (
			<div>
				<p>Current User:</p>
				<code>
					{JSON.stringify(props)}
				</code>
				<p>Your Patient:</p>
				<PatientProfile user = {user} />
				<p>Add a reminder:</p>
				<ReminderForm user = {user}/>
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