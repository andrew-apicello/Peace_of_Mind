import React from 'react';
import axios from 'axios';


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
      reminderMessage: ""
    }
}
  componentDidMount() {
    axios.get('/auth/reminders').then(response => {
      console.log(response.data)
      if (response.data) {
        this.setState({
          reminders: response.data,
          reminderTitle: "",
          dayToComplete: "",
          timeToComplete: "",
          medicationQuantity: "",
          medicationRefillDate: "",
          reminderMessage: ""
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
            <p>Current Reminders:</p>
            {this.state.reminders.length ? (
              <ul>
                {this.state.reminders.map(reminder => (
                  <li key={reminder._id}>Title: {reminder.reminderTitle + " "}
                  Day: {reminder.dayToComplete + " "}
                  Time: {reminder.timeToComplete + " "}
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