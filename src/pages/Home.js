// import React from "react";
// import LoginForm from "../components/LoginForm";

// const Home = () =>
//   <div>
//     <h1>Login Page / Home</h1>

//     	<LoginForm />

//   </div>;

// export default Home;


import React from 'react'
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

export default Home