
import React from 'react'

// import Clock from "../components/Clock";

import UserProfile from "./UserProfile"


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
				<div className="row">
					<div className="col-md-6">
						<h1>Peace of Mind</h1>
					</div>
				</div>
			</div>
		)
	}
}


export default Home

