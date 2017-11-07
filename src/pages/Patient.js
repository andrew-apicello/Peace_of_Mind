import React from 'react'
import ReminderForm from '../components/ReminderForm'
import PatientProfile from '../components/PatientProfile'
import {Row, Col} from "react-bootstrap"

const Patient = props => {
	if (props.user) {
		return (
			<div class="container">
				<Row>
					<Col lg={12}>
						<PatientProfile />
					</Col>
				</Row>
				<Row>
					<Col lg={12}>
					<ReminderForm />
					</Col>
				</Row>
			</div>
		)
	} else {
		return (
			<div class="container">
				<p>Please add a patient before adding a reminder</p>
			</div>
		)
	}
}

export default Patient