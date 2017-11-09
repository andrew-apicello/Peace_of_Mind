import React from 'react';
import axios from 'axios';
import {Well} from "react-bootstrap";

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
      console.log(response.data)
      console.log(day)
      if (response.data) {
        this.setState({
          reminders: response.data
        
        })
      };
    });

  }

  render() {
    return (
      <div>
        <div className ='container'>
          <div className ='row'>
            <div className='col-md-12'>
            <h2>Today's Reminders:</h2>
            
            {this.state.reminders.length ? (
              <ul>
                {this.state.reminders.map(reminder => (
                  <Well key={reminder._id} id={reminder._id}>
                  {reminder.timeToComplete + " "}
                  <br />
                  To do: {reminder.reminderTitle + " "}
                  <br />
                  Day: {reminder.dayToComplete + " "}
                  <br />
                  Dosage: {reminder.medicationDosage + " "}
                  <br />
                  Medication Refill Date: {reminder.medicationRefillDate + " "}
                  <br />
                  Message: {reminder.reminderMessage + " "}
                  </Well>
                ))}
              </ul>
            ) : (
                <p>No Reminders to Display</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DisplayReminders;