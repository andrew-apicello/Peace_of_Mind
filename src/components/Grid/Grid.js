  import React from 'react';
// import ReactDOM from 'react-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import "./Grid.css";


class GridHome extends React.Component {
  render() {
    return (
    <Grid className="grid">
      <Row>
        <Col xs={6} md={3}>
        <h2> Schedule your Medications </h2>
          <Image height="250" width="250" alt="drug icon" src="https://cdn.pixabay.com/photo/2017/09/30/01/42/medicine-2801025_960_720.png" rounded />
          <h4> Choose the time increments of your personal medication schedule</h4>
        </Col>
        <Col xs={6} md={3}>
        <h2>Get Notifications and Alerts </h2>
          <Image height="250" width="250" alt="ear icon" src="https://cdn.pixabay.com/photo/2017/09/29/00/39/ear-icon-2797533_960_720.png" rounded />
          <h4> Get texts letting you know when your loved one has missed a scheduled reminder </h4>
        </Col>
        <Col xs={6} md={3}>
        <h2> Keep Up-To-Date on the Medication</h2>
          <Image height="250" width="250" alt="stethoscope icon" src="https://cdn.pixabay.com/photo/2017/05/15/23/47/stethoscope-icon-2316460_960_720.png" rounded />
          <h4>No need for confussion, enter your medication name and recieve a picture of that pill </h4>
        </Col>
        <h2>Always Keeping Your Mind at Ease</h2>
        <Col xs={6} md={3}>
          <Image height="250" width="250" alt="heart icon" src="https://cdn.pixabay.com/photo/2017/05/15/23/44/heart-icon-2316451_960_720.png" rounded />
          <h4>Follow along with your loved-ones schedule in real-time to monitor their medications</h4>
        </Col>
        
      </Row>
    </Grid>
    );
  }
} 

export default GridHome;