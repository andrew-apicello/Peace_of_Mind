import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm'
import SignupForm from './components/SignupForm/SignupForm'
import Header from './components/Header/Header'
import Home from './pages/Home'
import './App.css'
import Patient from './pages/Patient'

const DisplayLinks = props => {
	if (props.loggedIn) {
		return (
			<div>
				<nav className="navbar navbar-default navbar-fixed-top">
					<div className="container">
						<ul className="nav navbar-nav">
							<li className="nav-item">
								<a href="">Peace of Mind</a>
							</li>
							<li className="nav-item">
								<Link to="/" className="nav-link">
									Home
								</Link>
							</li>
							<li>
								<Link to="#" className="nav-link" onClick={props._logout}>
									Logout
								</Link>
							</li>
							<li>
								<Link to="/patient" className="nav-link">
									Patient Profile
								</Link>
							</li>
						</ul>
					</div>
				</nav>
			</div>

		)
	} else {
		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container">
					<ul className="nav navbar-nav">
						<li className="nav-item">
							<Link to="/" className="nav-link">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/login" className="nav-link">
								login
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/signup" className="nav-link">
								sign up
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		)
	}
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null,
			patient: null	
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log(`${response.data.user.email} is being logged in`);
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(email, password) {
		axios
			.post('/auth/login', {
				email,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	}

	render() {
		return (
			<div className="App">	
				<div className="row">	
					<div className="col-md-11">		
						{/* LINKS to our different 'pages' */}
						<Header user={this.state.user} />
						<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
						{/*  ROUTES */}
						{/* <Route exact path="/" component={Home} /> */}
						<Route exact path="/" render={() => <Home user={this.state.user} />} 
						/>
						<Route exact path="/patient" render={() => <Patient user={this.state.user} />} 
						/>
						<Route exact path="/login" render={() =>
								<LoginForm _login={this._login} />
							}
						/>
						<Route exact path="/signup" component={SignupForm} />

					</div>
				</div>
			</div>
		)
	}
}

export default App
