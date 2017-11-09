import React from 'react';
import axios from 'axios';
import {Well, Row, Col} from "react-bootstrap";
import "./DisplayReminders.css";

class DisplayReminders extends React.Component {
constructor() {
  super()
  this.state = {
      reminders: [],
      reminderTitle: "",
      dayToComplete: "",
      timeToComplete: "",
      medicationDosage: "",
      medicationRefillDate: "",
      reminderMessage: "",
      numberToText: ""
    }
}
  componentDidMount() {
    let day;
    switch (new Date().getDay()) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
    }

    const patientId = this.props.user.patients[0];

    // Get all reminders based on what day it is to display on the screen
    axios.get('/auth/reminders/' + patientId + "/" + day).then(response => {
      console.log(response.data);
      console.log(day);
      if (response.data) {
        this.setState({
          reminders: response.data
        })
      };
    });

  }

  //Original code attempting to add className for well colors
  // className={this.state.reminders.responseLate ? ('incomplete' ): 'completed'}

  render() {
    return (
      <Row className="todaysReminders">
        <Col lg={12}>
          <h2>Today's Reminders:</h2>
            
            {this.state.reminders.length ? (
              <div>
                {this.state.reminders.map(reminder => (
                      <Well key={reminder._id} id={reminder._id} className="remindersWell">
                        <Row className="mainRow">
                          <Col sm={2}>
                            <h2 className="timeToComplete">{reminder.timeToComplete}</h2>
                          </Col>
                          <Col sm={8}>
                            <h2 className="toDo">{reminder.reminderTitle}</h2>
                          </Col>
                          <Col sm={2}>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={4}>
                            Dosage:<br />
                            {reminder.medicationDosage }
                           </Col>
                           <Col sm={4}> 
                            Refill Date: <br/>
                            {reminder.medicationRefillDate}
                            </Col>
                            <Col sm={4}>
                            Message: <br />
                            {reminder.reminderMessage}
                            </Col>
                        </Row>
                      </Well>
                ))}
              </div>
            ) : (
                <p>No Reminders to Display</p>
              )}
            </Col>
          </Row>
    );
  }
}
export default DisplayReminders;