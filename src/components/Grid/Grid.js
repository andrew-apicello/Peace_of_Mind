  import React from 'react';
// import ReactDOM from 'react-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import "./Grid.css";


class GridHome extends React.Component {
  render() {
    return (
    <Grid>


      <Row>
        <Col xs={6} md={3}>
        <h1> Schedule your Medications </h1>
          <Image height="250" width="250" alt="drug icon" src={require("../../assets/medicine.png")} rounded />
          <p> Choose the time increments of your personal medication schedule</p>
        </Col>
        <Col xs={6} md={3}>
        <h1>Get Notifications and Alerts </h1>
          <Image height="250" width="250" alt="ear icon" src={require("../../assets/ear-icon.png")} rounded />
          <p> Get texts letting you know when your loved one has missed a scheduled reminder </p>
        </Col>
        <Col xs={6} md={3}>
        <h1> Keep Up-To-Date on the Medication </h1>
          <Image height="250" width="250" alt="stethoscope icon" src={require("../../assets/stethoscope-icon.png")} rounded />
          <p>No need for confussion, enter your medication name and recieve a picture of that pill </p>
        </Col>
        <h1>Keeping Your Mind at Ease</h1>
        <Col xs={6} md={3}>
          <Image height="250" width="250" alt="heart icon" src={require("../../assets/heart-icon.png")} rounded />
          <p>Follow along with your loved-ones schedule in real-time to monitor their medications</p>
        </Col>
      </Row>
    </Grid>
    );
  }
} 

export default GridHome;