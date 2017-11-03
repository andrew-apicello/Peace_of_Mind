import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		console.log(event.target);
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		// TODO - validate!

		if (this.state.email || this.state.password) {
			axios
			.post('/auth/signup', {
				email: this.state.email,
				password: this.state.password
			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('youre good')
					this.setState({
						redirectTo: '/login'
					})
				} else {
					console.log('duplicate')
				}
			})
    } else {
		 alert("Please fill out your email");
		}

		if (this.state.password) {
			axios
			.post('/auth/signup', {
				email: this.state.email,
				password: this.state.password
			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('youre good')
					this.setState({
						redirectTo: '/login'
					})
				} else {
					console.log('duplicate')
				}
			})
    } else {
		 alert("Please add a password");
		}

	};

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<div className="SignupForm">
				<form className="form">
					<h1>Signup form</h1>
					<label htmlFor="email">Email: </label>
					<input
						type="text"
						name="email"
						value={this.state.email}
						onChange={this.handleChange}
						className="form-control"
					/>
					<label htmlFor="password">Password: </label>
					<input
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
						className="form-control"
					/>
					<label htmlFor="confirmPassword">Confirm Password: </label>
					<input
						type="password"
						name="confirmPassword"
						value={this.state.confirmPassword}
						onChange={this.handleChange}
						className="form-control"
					/>
					<button onClick={this.handleSubmit} className="btn">Sign up</button>
				</form>
			</div>
		)
	}
}

export default SignupForm;
