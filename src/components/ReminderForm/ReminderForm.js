import React from 'react';
import Input from "../Input/Input"
import { Button } from "react-bootstrap"
import axios from 'axios';


class ReminderForm extends React.Component {
constructor() {
  super()
  this.state = {
      _id: "",
      reminderTitle: "",
      dayToComplete: "",
      timeToComplete: "",
      medicationQuantity: "",
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
            dayToComplete: "",
            timeToComplete: "",
            medicationQuantity: "",
            medicationRefillDate: "",
            reminderMessage: ""
          });
        } else {
          console.log('error')
        }
      })
  };

  render() {
    return (
      <div>
        <div className ='container'>
          <div className ='row'>
            <div className='col-md-12'>
                <form>
                  <div className='row'>
                      <Input
                        name="reminderTitle"
                        value={this.state.reminderTitle}
                        onChange={this.handleInputChange}
                        placeholder="Reminder Title"
                      />
                      <Input
                        name="dayToComplete"
                        value={this.state.dayToComplete}
                        onChange={this.handleInputChange}
                        placeholder="Day to complete"
                      />
                      <Input
                        name="timeToComplete"
                        value={this.state.timeToComplete}
                        onChange={this.handleInputChange}
                        placeholder="What time to take"
                      />
                      <Input
                        name="medicationQuantity"
                        value={this.state.medicationQuantity}
                        onChange={this.handleInputChange}
                        placeholder="Medication Quantity"
                      />
                      <Input
                        name="medicationRefillDate"
                        value={this.state.medicationRefillDate}
                        onChange={this.handleInputChange}
                        placeholder="Refill Date"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReminderForm;