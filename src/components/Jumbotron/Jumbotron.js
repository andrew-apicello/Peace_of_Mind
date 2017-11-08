import React from 'react';
import { Jumbotron } from 'react-bootstrap'
import "./Jumbotron.css";
import { Image } from "react-bootstrap"
import { Row, Col } from "react-bootstrap"



class Jumbotrons extends React.Component {
  render() {
    return (
    <div className="container">
    <Row>
	<Col md={12}>
    <Jumbotron className="Jumbotron">
    <Image className="pill" src="https://www.shareicon.net/download/2015/12/27/693738_medical.svg"></Image>
    <h1>PillMinder</h1>
    <p>Welcome to PillMinder! Designed to give you peace of mind while your loved one still maintains their independence. </p>
  
  </Jumbotron>
  </Col>
	</Row>
  </div>
);

}
}

export default Jumbotrons;