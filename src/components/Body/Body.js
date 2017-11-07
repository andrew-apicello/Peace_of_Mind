

// import React from "react";
// import "./Body.css";
// import ReactDOM from 'react-dom'

// // const Footer = () =>
// //   <footer className="footer">
// //     <span>PillMinder 2017</span>
// //   </footer>;

// // export default Footer;


// const Header = ({title}) => (<header>{title}</header>);
// const Main = ({title}) => (<main>{title}</main>);
// const Footer = ({title}) => (<footer>{title}</footer>);

// class Body extends React.Component {
//   render() {
//     const {header,main,footer} = this.props;
//     return (
//       <div className="app">
//         <Header title={header} />
//         <Main title={main} />
//         <Footer title={footer}/>
//       </div>
//     );
//   }
// };

// ReactDOM.render(
//   <Body
//     header="I am the header" 
//     main="I am the main" 
//     footer="I am the footer" />, 
//   document.getElementById('react')
// );

// export default Body;


import React from "react";
import "./Footer.css";

const Footer = () =>
  <footer className="footer">
    <span>Pupster 2017</span>
  </footer>;

export default Footer;
