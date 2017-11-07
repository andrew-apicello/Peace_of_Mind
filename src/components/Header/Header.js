import React from 'react'
// TODO - add proptypes

const Header = props => {
	let Greeting
	if (props.user === null) {
	} else if (props.user.firstName) {
		Greeting = (
			<h1>
				Welcome, <strong>{props.user.firstName}</strong>
			</h1>
		)
	} else if (props.user.local.email) {
		Greeting = (
			<h1>
				Welcome, <strong>{props.user.local.email} </strong>
			</h1>
		)
	}
	return (
		<div className="Header">
			{Greeting}
		</div>
	)
}

export default Header