import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl, Button, Form } from 'react-bootstrap';
import "./SignupForm.css";

class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
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
		//If no email is input
		if (!this.state.email){
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
				phone: this.state.phone
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
			<div className="row">
				<div className="col-md-12">
					<div className="SignupForm">
						<h3>Signup</h3>
						<Form className="form">
							<FormGroup
		        	>
								<ControlLabel className="form-label">Email</ControlLabel>
									<FormControl
										type="email"
										name="email"
										value={this.state.email}
										onChange={this.handleChange}
										className="form-control"
									/>
							</FormGroup>
							<FormGroup>
								<ControlLabel className="form-label">Phone Number</ControlLabel>
								<FormControl
	              	type="text"
	                name="phone"
	                value={this.state.phone}
	                onChange={this.handleChange}
	                placeholder="Phone"
	              	/>
              </FormGroup>
								<ControlLabel className="form-label">Password</ControlLabel>
							<FormGroup
								controlId="password"
		        		validationState={this.passwordLengthValidate()}
		        	>
								<FormControl
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
									className="form-control"
									minLength="6"
									maxLength="15"
								/>
							</FormGroup>
							<ControlLabel className="form-label">Confirm Password</ControlLabel>
							<FormGroup
								controlId="formBasicText"
		        		validationState={this.confirmPasswordValidate()}
		        	>
							<FormControl
								type="password"
								name="confirmPassword"
								value={this.state.confirmPassword}
								onChange={this.handleChange}
								className="form-control"
								minLength="6"
								maxLength="15"
							/>
							</FormGroup>
							<Button onClick={this.handleSubmit} className="btn">Sign up</Button>
						</Form>
					</div>
				</div>
			</div>
		)
	}
}

export default SignupForm;
