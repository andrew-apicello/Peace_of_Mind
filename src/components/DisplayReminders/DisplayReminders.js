import React from 'react';
import axios from 'axios';
const moment = require('moment');


class DisplayReminders extends React.Component {
constructor() {
  super()
  this.state = {
      reminders: [],
      reminderTitle: "",
      dayToComplete: "",
      timeToComplete: "",
      medicationQuantity: "",
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

    // Get all reminders based on what day it is to display on the screen
    axios.get('/auth/reminders/' + day).then(response => {
      console.log(response.data)
      if (response.data) {
        this.setState({
          reminders: response.data
        })
      };
    });

    // Get the patient's phone number -- Need to base this on who is logged in
    axios.get('/auth/patients').then(response => {
      console.log(response.data)
      console.log("number to text " + response.data.patientPhone);
      if (response.data) {
        this.setState({
          numberToText: response.data.patientPhone
        })
      };
    });

    // Get the current time and query the db based on what time it is to check for reminders
    const clock = () => {
      console.log("clock function has been called");
      // Get the current minute
      let minutes = moment().format('mm');

      if(minutes == 26 || minutes == 30) {
        console.log(minutes);
        // Get the full current time to compare with DB
        let time = moment().format('H:mm');
        console.log(time);
        console.log(day);

        axios.get('/auth/reminders/' + day + "/" + time + "/" + this.state.numberToText).then(response => {
          console.log(response.data)
        });
      }
    }
    // Run the clock function every minute
    setInterval(clock, 60001);

  }


  render() {
    return (
      <div>
        <div className ='container'>
          <div className ='row'>
            <div className='col-md-12'>
            <p>Today's Reminders:</p>
            {this.state.reminders.length ? (
              <ul>
                {this.state.reminders.map(reminder => (
                  <li key={reminder._id} id={reminder._id}>
                  {reminder.timeToComplete + " "}
                  To do: {reminder.reminderTitle + " "}
                  Day: {reminder.dayToComplete + " "}
                  Medication Qty: {reminder.medicationQuantity + " "}
                  Medication Refill Date: {reminder.medicationRefillDate + " "}
                  Message: {reminder.reminderMessage + " "}
                  </li>
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