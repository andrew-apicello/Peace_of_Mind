import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl, Button, Form, Col } from 'react-bootstrap';
import "./SignupForm.css";

class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
			firstName: "",
			lastName: "",
			email: '',
			phone: '',
			password: '',
			confirmPassword: '',
			redirectTo: null,
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	};

	passwordLengthValidate = () => {
    const length = this.state.password.length;
	    if (length > 6) return 'success';
	    else if (length > 4) return 'warning';
	    else if (length > 0) return 'error';
	    return null;
  };

  confirmPasswordValidate = () => {
  	if (this.state.password === this.state.confirmPassword)
  		return "success";
  	else if (this.state.password !== this.state.confirmPassword)
  		return "error";
  	else return null;
  };

	handleChange = event => {
		console.log(event.target);
		this.setState({
			[event.target.name]: event.target.value
		})
	};

	handleSubmit = event => {
		event.preventDefault()
		//If no First Name is entered
		if(!this.state.firstName){
			alert("Please enter your First Name");
		
			this.setState({
				redirectTo: ""
			})
		}else if (!this.state.lastName){
			alert("Please enter your Last Name");

			this.setState({
				redirstTo: ""
			})	
		//If no email is input
		}else if (!this.state.email){
			alert("Please enter an email");

			 this.setState({
      	email: "",
				redirectTo: ""
			})
		// if no password is input
		} else if (!this.state.password){
			alert("Please enter a password");

			 this.setState({
      	password: "",
				redirectTo: "",
				confirmPassword: ""
			})
		} else if (this.state.password.length < 6){
			alert("Password must be longer than 6 characters");

			this.setState({
				redirectTo: "",
				confirmPassword: ""
			})
		}else if ((this.state.password) !== (this.state.confirmPassword)){
			alert("Passwords do not match");

			this.setState({
      	password: "",
				redirectTo: "",
				confirmPassword: ""
			})
    } else {
			axios
			.post('/auth/signup', {
				email: this.state.email,
				password: this.state.password,
				phone: this.state.phone,
				firstName: this.state.firstName,
				lastName: this.state.lastName
			})
			.then(response => {
				console.log(response)
				if (!response.data.error) {
					console.log(response.data.error);
					console.log("Signing you up...login to get started on your profile");
					this.setState({
						redirectTo: '/login'
					})
				} else {
					console.log(response.data.error);
					alert (response.data.error)
					this.setState({
		      	password: "",
		      	email: "",
						redirectTo: "",
						confirmPassword: ""
					})
				}
			})
		}
	};

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<div className="container">
				<div className="SignupForm">
					<Form horizontal className="form">
						<h3>Signup</h3>

						<FormGroup controlId="formHorzontalEmail"
	        	>
							<Col componentClass={ControlLabel} sm={3}>First Name:
      				</Col>
      				<Col sm={7}>
								<FormControl
									type="text"
									name="firstName"
									value={this.state.firstName}
									onChange={this.handleChange}
									className="form-control"
								/>
							</Col>
						</FormGroup>

						<FormGroup controlId="formHorzontalEmail"
	        	>
							<Col componentClass={ControlLabel} sm={3}>Last Name:
      				</Col>
      				<Col sm={7}>
								<FormControl
									type="text"
									name="lastName"
									value={this.state.lastName}
									onChange={this.handleChange}
									className="form-control"
								/>
							</Col>
						</FormGroup>

						<FormGroup controlId="formHorzontalEmail"
	        	>
							<Col componentClass={ControlLabel} sm={3}>Email:
      				</Col>
      				<Col sm={7}>
								<FormControl
									type="email"
									name="email"
									value={this.state.email}
									onChange={this.handleChange}
									className="form-control"
									placeholder="example@example.com"
								/>
							</Col>
						</FormGroup>

						<FormGroup>
							<Col componentClass={ControlLabel} sm={3}>Phone Number:
      				</Col>
      				<Col sm={7}>
								<FormControl
	              	type="tel"
	              	pattern="^\d{3}-\d{3}-\d{4}$" required
	                name="phone"
	                value={this.state.phone}
	                onChange={this.handleChange}
	                placeholder="000-000-0000"
	              	/>
              </Col>	
            </FormGroup>

						<FormGroup
							controlId="password"
	        		validationState={this.passwordLengthValidate()}
	        	>
	        		<Col componentClass={ControlLabel} sm={3}>Password:
    					</Col>
	        		<Col sm={7}>
								<FormControl
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
									className="form-control"
									minLength="6"
									maxLength="15"
								/>
							</Col>
						</FormGroup>

						<FormGroup
							controlId="formBasicText"
	        		validationState={this.confirmPasswordValidate()}
	        	>
	        		<Col componentClass={ControlLabel} sm={3}>Confirm Password:
    					</Col>
    					<Col sm={7}>
								<FormControl
									type="password"
									name="confirmPassword"
									value={this.state.confirmPassword}
									onChange={this.handleChange}
									className="form-control"
									minLength="6"
									maxLength="15"
								/>
							</Col>
						</FormGroup>
						<Button onClick={this.handleSubmit} className="btn">Sign up</Button>
					</Form>
				</div>
			</div>
		)
	}
}

export default SignupForm;
