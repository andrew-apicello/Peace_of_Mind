
import React from 'react'
import PatientForm from '../components/PatientForm'
import DisplayReminders from '../components/DisplayReminders'
import Clock from "../components/Clock";
import Carousel from "../components/Carousel";
import Jumbotrons from "../components/Jumbotron";
import Footer from "../components/Footer";
import GridHome from "../components/Grid";
import "./Home.css"
import { Row, Col } from "react-bootstrap"

const Home = props => {
	let user = props.user || 'no user';
	console.log('props: ', user._id);
	
	// If a user exists and if that user has patients, display the patient's reminders
	if (props.user && props.user.patients.length > 0) {
		return (
			<div className="container">
			<div className="Home">
				<Clock />
				<DisplayReminders user = {user}/>
			</div>
		</div>
		)
	} 
	// Display the add a patient form if the user doesn't have a saved patient
	else if (props.user && props.user.patients.length === 0) {
		return (
			<div className="container">
			<div className="Home">
						{console.log(props.user)}
				<p>Add a patient to get started:</p>
				<PatientForm />
			</div>
		</div>
		)
	} 

	else if (!props.user) {
		return (
			
			<div className="Homediv">
			<Jumbotrons/>		
			<Carousel />

			<GridHome />

			<Footer />
			</div>
		

			
		)
	}
}

export default Home





