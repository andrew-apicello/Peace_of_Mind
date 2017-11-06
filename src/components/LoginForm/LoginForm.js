import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { FormGroup, ControlLabel, FormControl, Form } from 'react-bootstrap';
import axios from 'axios';

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	};

	handleChange = event => {
		console.log(event.target);
		this.setState({
			[event.target.name]: event.target.value
		})
	};

	handleSubmit = event => {
		event.preventDefault()
		console.log(event)

		if (!this.state.email){
      alert(`Please enter your email`);

      this.setState({
      	email: "",
				redirectTo: ""
			})
		}else if (!this.state.password){
      alert(`Please enter your password`);

      this.setState({
      	password: "",
				redirectTo: ""
			})
		}else{
			console.log(`Trying to login`);
			axios.get("/auth/user", {
				email: this.state.email,
				password: this.state.password
			}).then(response =>{
				console.log(response);
				this.props._login(this.state.email, this.state.password)
					this.setState({
						redirectTo: '/'
					})
			})
		}
	};

	render() {
		if (this.state.redirectTo) {
			console.log(`Redirecting to: ${this.state.redirectTo}`);
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="LoginForm">
					<h3>Login</h3>
					<Form inline className="form">
					  <FormGroup
          		controlId="formBasicText"
        		>
							<ControlLabel className="form-label">Email</ControlLabel>
							<FormControl
								type="email"
								name="email"
								required
								value={this.state.email}
								onChange={this.handleChange}
								className="form-control"
							/>
						</FormGroup>
						<FormGroup 
							controlId="formBasicText"
          	>
							<ControlLabel className="form-label">Password: </ControlLabel>
							<FormControl
								type="password"
								name="password"
								required
								value={this.state.password}
								onChange={this.handleChange}
								className="form-control"
								minLength="6"
								maxLength="15" 
							/>
							<button onClick={this.handleSubmit} className="btn">Login</button>
						</FormGroup>
					</Form>
						<p>Need an account? <Link to="/signup">Sign up</Link></p>
					</div>
			)
		}
	}
}

export default LoginForm;