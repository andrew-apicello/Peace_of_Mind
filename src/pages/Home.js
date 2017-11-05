import React from 'react'
import PatientForm from '../components/PatientForm'
// import Clock from "../components/Clock";
// TODO - add proptypes

const Home = props => {
	// If a user exists and if that user has patients, display the patient's reminders
	if (props.user && props.user.patients.length > 0) {
		return (
			<div className="Home">
				<p>Current User:</p>
				<code>
					{JSON.stringify(props)}
				</code>
			</div>
		)
	} 
	// Display the add a patient form if the user doesn't have a saved patient
	else if (props.user && props.user.patients.length === 0) {
		return (
			<div className="Home">
						{console.log(props.user)}
				<p>Current User:</p>
				<code>
					{JSON.stringify(props)}
				</code>
				<p>Add a patient to get started:</p>
				<PatientForm />
			</div>
		)
	} 

	else if (!props.user) {
		return (
			<div className="Home">
				<p>Current User:</p>
				<code>
					{JSON.stringify(props)}
				</code>
			</div>
		)
	}
}

export default Home