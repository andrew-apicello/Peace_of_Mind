import React from 'react'
import UserProfile from "./UserProfile"
import LoginForm from "../components/LoginForm"

// TODO - add proptypes

const Home = props => {
	if (props.user) {
		return (
			<div className="Home">
					<UserProfile />
			</div>
		)
	} else {
		return (
			<div className="Home">
				<div class="row">
					<div class="col-md-6">
						<h1>Peace of Mind</h1>
					</div>
				</div>
			</div>
		)
	}
}

export default Home