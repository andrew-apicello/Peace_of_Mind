import React from 'react';
import Input from "../Input/Input"
import { Button } from "react-bootstrap"
import axios from 'axios';

class PatientForm extends React.Component {
constructor() {
  super()
  this.state = {
      _id: "",
      patientName: "",
      patientPhone: "",
      patientAddress: "",
      redirectTo: null
    }
}
  componentDidMount() {
    axios.get('/auth/user').then(response => {
      console.log(response.data)
      if (!!response.data.user) {
        this.setState({
          _id: response.data.user._id
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
    event.preventDefault();
    console.log(this.state.patientName);
    console.log(this.state.patientPhone);
    console.log(this.state.patientAddress);
		axios
			.post('/auth/addPatient', {
        _id: this.state._id,
        patientName: this.state.patientName,
        patientPhone: this.state.patientPhone,
        patientAddress: this.state.patientAddress

			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('new patient was added')
          this.setState({
            redirectTo: '/reminders'
          })
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
                        name="patientName"
                        value={this.state.patientName}
                        onChange={this.handleInputChange}
                        placeholder="Patient's Name"
                      />
                      <Input
                        name="patientPhone"
                        value={this.state.patientPhone}
                        onChange={this.handleInputChange}
                        placeholder="Patient's Phone"
                      />
                      <Input
                        name="patientAddress"
                        value={this.state.patientAddress}
                        onChange={this.handleInputChange}
                        placeholder="Patient's Address"
                      />
                      <Button bsStyle="primary"
                        onClick={this.handleFormSubmit}
                        type="success"
                        className="input-lg"
                      >
                        Add Patient
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

export default PatientForm;