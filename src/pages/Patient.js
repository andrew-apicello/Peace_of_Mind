import React from 'react'
import ReminderForm from '../components/ReminderForm'
import PatientProfile from '../components/PatientProfile'
import {Row, Col, Jumbotron} from "react-bootstrap"
import Home from './Home'
import Header from '../components/Header/Header'
import "./Patient.css"
import Footer from "../components/Footer/Footer"

const Patient = props => {
	let user = props.user || 'no user';
	console.log('props: ', user._id);

	if (props.user) {
		return (
				<div className="container">
					<Row className="patientBody">
						<Col lg={12}>
							<PatientProfile user = {user} />
						</Col>
					</Row>
					<Row className="reminderBody">
						<Col lg={12}>
							<ReminderForm user = {user}/>
						</Col>
					</Row>
					<Footer />
				</div>
		)
	} else {
		return (
				<Home />
		)
	}
}

export default Patient