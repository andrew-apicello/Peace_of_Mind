import React from 'react'
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
						<img src="https://www.thesun.co.uk/wp-content/uploads/2017/01/nintchdbpict000261270267.jpg?strip=all&w=960" alt="image"></img>
					</div>
				</div>
			</div>
		)
	}
}

export default Home