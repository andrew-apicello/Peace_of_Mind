import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: '',
			redirectTo: null
		}
		// this.googleSignin = this.googleSignin.bind(this)
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
		console.log('handleSubmit')
		this.props._login(this.state.email, this.state.password)
		this.setState({
			redirectTo: '/'
		})
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="LoginForm">
					<div className="container">
						<h1>Login form</h1>
						<form>
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
							<button onClick={this.handleSubmit} className="btn">Login</button>
						</form>
					</div>
				</div>
			)
		}
	}
}

export default LoginForm;
