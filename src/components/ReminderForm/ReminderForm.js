import React from 'react';
import Input from "../Input/Input"
import { Button, FormGroup, ControlLabel, FormControl, Form, Checkbox, Col } from "react-bootstrap"
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class ReminderForm extends React.Component {
constructor() {
  super()
  this.state = {
      _id: "",
      reminders: [],
      reminderTitle: "",
      dayToComplete: [],
      timeToComplete: "",
      medicationQuantity: "",
      medicationRefillDate: "",
      reminderMessage: "",
      redirectTo: null
    }
}
  componentDidMount() {
    const id = this.props.user._id;
    const patientId = this.props.user.patients[0];

    console.log("patientId: " + patientId);

    axios.get('/auth/patients/' + id).then(response => {
      console.log(response.data)
      if (response.data.length > 0) {
        this.setState({
          _id: response.data[0]._id
        })
      } else {
        alert("Please add a patient before adding a patient profile.")
        this.setState({
          redirectTo: "/"
        })

      };
    });

      axios.get('/auth/reminders/' + patientId).then(response => {
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
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    const patientId = this.props.user.patients[0];
    console.log(this.state.reminderTitle);
    console.log(this.state.dayToComplete);
    console.log(this.state.timeToComplete);
    console.log(this.state.medicationQuantity);
    console.log(this.state.medicationRefillDate);
    console.log(this.state.reminderMessage);

    axios
      .post('/auth/addReminder', {
        _id: this.state._id,
        reminderTitle: this.state.reminderTitle,
        dayToComplete: this.state.dayToComplete,
        timeToComplete: this.state.timeToComplete,
        medicationQuantity: this.state.medicationQuantity,
        medicationRefillDate: this.state.medicationRefillDate,
        reminderMessage: this.state.reminderMessage
      })
      .then(response => {
        console.log(response)
        if (!response.data.errmsg) {
          console.log('reminder was added')

          this.setState({
            reminderTitle: "",
            dayToComplete: [],
            timeToComplete: "",
            medicationQuantity: "",
            medicationRefillDate: "",
            reminderMessage: ""
          });


          axios.get('/auth/reminders/' + patientId).then(response => {
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

  };

  render() {
    if (this.state.redirectTo === "/") {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    }
    return (
      <div>
        <div className ='container'>
          <div className ='row'>
            <div className='col-md-12'>
                <Form>
                  <div className='row'>
                    <FormGroup>
                      <FormControl
                        name="reminderTitle"
                        type="text"
                        value={this.state.reminderTitle}
                        onChange={this.handleInputChange}
                        placeholder="Type i.e. Medication Reminder"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={4}>Choose which days medication must be taken:
                      </Col>
                      <Col sm={7}>
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
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        componentClass="select"
                        name="dayToComplete"
                        onChange={this.handleInputChange}
                        placeholder="Day"
                      >
                        <option value="">Select Day</option>
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                      </FormControl>
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        name="timeToComplete"
                        value={this.state.timeToComplete}
                        onChange={this.handleInputChange}
                        placeholder="Time"
                      />
                    </FormGroup>
                      <Input
                        name="medicationQuantity"
                        value={this.state.medicationQuantity}
                        onChange={this.handleInputChange}
                        placeholder="Medication Quantity (if a medication reminder)"
                      />
                      <Input
                        name="medicationRefillDate"
                        value={this.state.medicationRefillDate}
                        onChange={this.handleInputChange}
                        placeholder="Refill Date (if a medication reminder)"
                      />
                      <Input
                        name="reminderMessage"
                        value={this.state.reminderMessage}
                        onChange={this.handleInputChange}
                        placeholder="Message"
                      />
                      <Button bsStyle="primary"
                        onClick={this.handleFormSubmit}
                        type="success"
                        className="input-lg"
                      >
                        Add Reminder
                      </Button>
                    </div>
              </Form>
            </div>
          </div>
          <div className ='row'>
            <div className='col-md-12'>
            <p>Current Reminders:</p>

     
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

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReminderForm;