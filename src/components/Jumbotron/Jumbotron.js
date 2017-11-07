import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap'
import "./Jumbotron.css";
import { Image } from "react-bootstrap"

class Jumbotrons extends React.Component {
  render() {
    return (
    <Jumbotron>
    <Image className="pill" src="https://www.shareicon.net/download/2015/12/27/693738_medical.svg"></Image>
    <h1>PillMinder</h1>
    <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    <p><Button bsStyle="primary">Learn more</Button></p>
  </Jumbotron>
);

}
}

export default Jumbotrons;