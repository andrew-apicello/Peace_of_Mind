<<<<<<< HEAD


import React from 'react'
=======
import React from 'react'
// import Clock from "../components/Clock";
>>>>>>> 15e9733f18dd2fdd19772f86a9174892b04de3e5
// TODO - add proptypes

const Home = props => {
	if (props.user) {
		return (
			<div className="Home">
				<p>Current User:</p>
				<code>
					{JSON.stringify(props)}
				</code>
			</div>
		)
	} else {
		return (
			<div className="Home">
				<p>Current User:</p>
				<code>
					{JSON.stringify(props)}
				</code>
			</div>
		)
	}
}

<<<<<<< HEAD
export default Home
=======
export default Home
>>>>>>> 15e9733f18dd2fdd19772f86a9174892b04de3e5
