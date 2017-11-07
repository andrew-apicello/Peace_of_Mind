import React from 'react';
import Input from "../Input/Input"
import { Button, Row, Col, FormGroup, ControlLabel, FormControl, Form, Checkbox } from "react-bootstrap"
import axios from 'axios';
import "./ReminderForm.css"


class ReminderForm extends React.Component {
constructor() {
  super()
  this.state = {
      _id: "",
      reminders: [],
      reminderTitle: "",
      dayToComplete: "",
      timeToCompleteHour: "",
      timeToCompleteMin: "",
      timeToCompleteAmPm: "",
      medicationDosage: "",
      medicationRefillDate: "",
      reminderMessage: ""
    }
}
  componentDidMount() {
    axios.get('/auth/patients').then(response => {
      console.log(response.data)
      if (response.data) {
        this.setState({
          _id: response.data._id
        })
      };
    });

      axios.get('/auth/reminders').then(response => {
      console.log(response.data)
      if (response.data) {
        this.setState({
          reminders: response.data
        })
      };
    });
  }

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    console.log(event.target);
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    console.log(this.state.reminderTitle);
    console.log(this.state.dayToComplete);
    console.log(this.state.timeToCompleteHour);
    console.log(this.state.timeToCompleteMin);
    console.log(this.state.timeToCompleteAmPm);
    console.log(this.state.medicationDosage);
    console.log(this.state.medicationRefillDate);
    console.log(this.state.reminderMessage);
    
    if(!this.state.reminderTitle){
      alert("Title Required");

    }else if (!this.state.dayToComplete){
      alert("Days required");

    }else{  
    axios
      .post('/auth/addReminder', {
        _id: this.state._id,
        reminderTitle: this.state.reminderTitle,
        dayToComplete: this.state.dayToComplete,
        timeToCompleteHour: this.state.timeToCompleteHour,
        timeToCompleteMin: this.state.timeToCompleteMin,
        timeToCompleteAmPm: this.state.timeToCompleteAmPm,
        medicationQuantity: this.state.medicationDosage,
        medicationRefillDate: this.state.medicationRefillDate,
        reminderMessage: this.state.reminderMessage
      })
      .then(response => {
        console.log(response)
        if (!response.data.errmsg) {
          console.log('reminder was added')

          this.setState({
            reminderTitle: "",
            dayToComplete: "",
            timeToCompleteHour: "",
            timeToCompleteMin: "",
            timeToCompleteAmPm: "",
            medicationDosage: "",
            medicationRefillDate: "",
            reminderMessage: ""
          });


          axios.get('/auth/reminders').then(response => {
          console.log("Getting new reminders...")
          console.log(response.data)
          if (response.data) {
            this.setState({
              reminders: response.data
            })
          };
        });

        } else {
          console.log('error')
        }
      })
    }
  };

  render() {
    return (
      <Row>
        <Col md={7}>
          <h3>Current Reminders:</h3>

          {this.state.reminders.length ? (
            <div>
              <br/>
              <p>SUNDAY: </p>
              {this.state.reminders.map(reminder => (
                <div key={reminder._id} id={reminder._id}>
                {reminder.dayToComplete === "Sunday" && reminder.medicationQuantity && reminder.medicationRefillDate ? (reminder.timeToComplete + " To Do: " + reminder.reminderTitle + " Medication Qty: " + reminder.medicationQuantity + " Medication Refill Date: " + reminder.medicationRefillDate + " Message: " + reminder.reminderMessage ) : ""}
                {reminder.dayToComplete === "Sunday" && !reminder.medicationQuantity && !reminder.medicationRefillDate ? (reminder.timeToComplete + " To Do: " + reminder.reminderTitle + " Message: " + reminder.reminderMessage ) : ""}
                </div>
              ))}
            
              <br/>
              <hr/>
              <p>MONDAY: </p>
              {this.state.reminders.map(reminder => (
                <div key={reminder._id} id={reminder._id}>
                {reminder.dayToComplete === "Monday" && reminder.medicationQuantity && reminder.medicationRefillDate ? (reminder.timeToComplete + " To Do: " + reminder.reminderTitle + " Medication Qty: " + reminder.medicationQuantity + " Medication Refill Date: " + reminder.medicationRefillDate + " Message: " + reminder.reminderMessage ) : ""}
                {reminder.dayToComplete === "Monday" && !reminder.medicationQuantity && !reminder.medicationRefillDate ? (reminder.timeToComplete + " To Do: " + reminder.reminderTitle + " Message: " + reminder.reminderMessage ) : ""}
                </div>
              ))}

              <br/>
              <hr/>
              <p>TUESDAY: </p>
              {this.state.reminders.map(reminder => (
                <div key={reminder._id} id={reminder._id}>
                {reminder.dayToComplete === "Tuesday" && reminder.medicationQuantity && reminder.medicationRefillDate ? (reminder.timeToComplete + " To Do: " + reminder.reminderTitle + " Medication Qty: " + reminder.medicationQuantity + " Medication Refill Date: " + reminder.medicationRefillDate + " Message: " + reminder.reminderMessage ) : ""}
                {reminder.dayToComplete === "Tuesday" && !reminder.medicationQuantity && !reminder.medicationRefillDate ? (reminder.timeToComplete + " To Do: " + reminder.reminderTitle + " Message: " + reminder.reminderMessage ) : ""}          
                </div>
              ))}
              <br/>
              <hr/>
              <p>WEDNESDAY: </p>
              {this.state.reminders.map(reminder => (
                <div key={reminder._id} id={reminder._id}>
                {reminder.dayToComplete === "Wednesday" && reminder.medicationQuantity && reminder.medicationRefillDate ? (reminder.timeToComplete + " To Do: " + reminder.reminderTitle + " Medication Qty: " + reminder.medicationQuantity + " Medication Refill Date: " + reminder.medicationRefillDate + " Message: " + reminder.reminderMessage ) : ""}
                {reminder.dayToComplete === "Wednesday" && !reminder.medicationQuantity && !reminder.medicationRefillDate ? (reminder.timeToComplete + " To Do: " + reminder.reminderTitle + " Message: " + reminder.reminderMessage ) : ""}
                </div>
              ))}
              <br/>
              <hr/>
              <p>THURSDAY: </p>
              {this.state.reminders.map(reminder => (
                <div key={reminder._id} id={reminder._id}>
                {reminder.dayToComplete === "Thursday" && reminder.medicationQuantity && reminder.medicationRefillDate ? (reminder.timeToComplete + " To Do: " + reminder.reminderTitle + " Medication Qty: " + reminder.medicationQuantity + " Medication Refill Date: " + reminder.medicationRefillDate + " Message: " + reminder.reminderMessage ) : ""}
                {reminder.dayToComplete === "Thursday" && !reminder.medicationQuantity && !reminder.medicationRefillDate ? (reminder.timeToComplete + " To Do: " + reminder.reminderTitle + " Message: " + reminder.reminderMessage ) : ""}
                </div>
              ))}

              <br/>
              <hr/>
              <p>FRIDAY: </p>
              {this.state.reminders.map(reminder => (
                <div key={reminder._id} id={reminder._id}>
                {reminder.dayToComplete === "Friday" && reminder.medicationQuantity && reminder.medicationRefillDate ? (reminder.timeToComplete + " To Do: " + reminder.reminderTitle + " Medication Qty: " + reminder.medicationQuantity + " Medication Refill Date: " + reminder.medicationRefillDate + " Message: " + reminder.reminderMessage ) : ""}
                {reminder.dayToComplete === "Friday" && !reminder.medicationQuantity && !reminder.medicationRefillDate ? (reminder.timeToComplete + " To Do: " + reminder.reminderTitle + " Message: " + reminder.reminderMessage ) : ""}         
                </div>
              ))}

              <br/>
              <hr/>
              <p>SATURDAY: </p>
              {this.state.reminders.map(reminder => (
                <div key={reminder._id} id={reminder._id}>
                {reminder.dayToComplete === "Saturday" && reminder.medicationQuantity && reminder.medicationRefillDate ? (reminder.timeToComplete + " To Do: " + reminder.reminderTitle + " Medication Qty: " + reminder.medicationQuantity + " Medication Refill Date: " + reminder.medicationRefillDate + " Message: " + reminder.reminderMessage ) : ""}
                {reminder.dayToComplete === "Saturday" && !reminder.medicationQuantity && !reminder.medicationRefillDate ? (reminder.timeToComplete + " To Do: " + reminder.reminderTitle + " Message: " + reminder.reminderMessage ) : ""}
                </div>
              ))}
            </div>
          ) : (
              <p>No Reminders Scheduled</p>
            )}
          </Col>
          <Col md={5}>
        <Form className="medicationForm">
          <h3 className="reminderFormTitle">Add a reminder</h3>
          <hr />
          <ControlLabel>Reminder Title:</ControlLabel>
            <FormControl
              name="reminderTitle"
              type="text"
              value={this.state.reminderTitle}
              onChange={this.handleInputChange}
              placeholder="Type i.e. Medication Reminder, Dr. Appt..."
            />
          <br />
          <ControlLabel>Choose which days medications must be taken</ControlLabel>
            <br />
            <Checkbox inline
              name="dayToComplete"
              value="Sunday"
              onChange={this.handleInputChange}
            >
              Sunday
            </Checkbox>
            <Checkbox inline 
              name="dayToComplete"
              value="Monday"
              onChange={this.handleInputChange}
            >
              Monday
            </Checkbox>
            <Checkbox inline
              name="dayToComplete"
              value="Tuesday"
              onChange={this.handleInputChange}
            >
              Tuesday
            </Checkbox>
            <Checkbox inline
              name="dayToComplete"
              value="Wednesday"
              onChange={this.handleInputChange}
            >
              Wednesday
            </Checkbox>
            <Checkbox inline
              name="dayToComplete"
              value="Thursday"
              onChange={this.handleInputChange}
            >
              Thursday
            </Checkbox>
            <Checkbox inline
              name="dayToComplete"
              value="Friday"
              onChange={this.handleInputChange}
            >
              Friday
            </Checkbox>
            <Checkbox inline
              name="dayToComplete"
              value="Saturday"
              onChange={this.handleInputChange}
            >
              Saturday
            </Checkbox>
        </Form>
          <br />
        <Form inline className="medicationForm">
            <ControlLabel>Hour</ControlLabel>
            {' '}
              <FormControl
                className="dropdownFields"
                name="timeToCompleteHour"
                componentClass="select"
                value={this.state.timeToCompleteHour}
                onChange={this.handleInputChange}
              >
                <option value="">Select Hour</option>
                <option value="1">01:</option>
                <option value="2">02:</option>
                <option value="3">03:</option>
                <option value="4">04:</option>
                <option value="5">05:</option>
                <option value="6">06:</option>
                <option value="7">07:</option>
                <option value="8">08:</option>
                <option value="9">09:</option>
                <option value="10">10:</option>
                <option value="11">11:</option>
                <option value="12">12:</option>
              </FormControl>
            <ControlLabel>Min: </ControlLabel>
              <FormControl
                className="dropdownFields"
                name="timeToCompleteMin"
                componentClass="select"
                value={this.state.timeToCompleteMin}
                onChange={this.handleInputChange}
                placeholder="Time"
              >
                <option value="">Select Min</option>
                <option value="00">:00</option>
                <option value="30">:30</option>
              </FormControl>
              <ControlLabel>AM/PM</ControlLabel>
              <FormControl
                className="dropdownFields"
                name="timeToCompleteAmPm"
                componentClass="select"
                value={this.state.timeToCompleteAmPm}
                onChange={this.handleInputChange}
                placeholder="Time"
              >
                <option value="">AM/PM</option>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </FormControl>
          </Form>
          <br />
          <Form inline className="medicationForm">
            <ControlLabel>Dosage:</ControlLabel>
              <FormControl
                className="dropdownFields"
                name="medicationQuantity"
                value={this.state.medicationDosage}
                onChange={this.handleInputChange}
                placeholder="(if a medication reminder)"
              />
            <ControlLabel>Refill Date:</ControlLabel>
              <FormControl
                className="dropdownFields"
                name="medicationRefillDate"
                value={this.state.medicationRefillDate}
                onChange={this.handleInputChange}
                placeholder="(if a medication reminder)"
              />
          </Form>
            <br />
          <Form className="medicationForm">
           <ControlLabel>Message</ControlLabel>
              <FormControl
                name="reminderMessage"
                componentClass="textArea"
                value={this.state.reminderMessage}
                onChange={this.handleInputChange}
                placeholder="Message"
              />
            <br />
            <Button bsStyle="primary"
              onClick={this.handleFormSubmit}
              type="success"
              className="input-lg"
            >
              Add Reminder
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default ReminderForm;