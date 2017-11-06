import React from 'react';
import Input from "../Input/Input"
import { Button, Form, FormGroup, ControlLabel, FormControl, } from "react-bootstrap"
import axios from 'axios';

class PatientForm extends React.Component {
constructor() {
  super()
  this.state = {
      _id: "",
      patientName: "",
      patientPhone: "",
      patientStreet: "",
      patientCity: "",
      patientState: "",
      patientZip: "",
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
    console.log(event.target);
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(`Name: ${this.state.patientName}`);
    console.log(`Phone: ${this.state.patientPhone}`);
    console.log(`Address: ${this.state.patientStreet}, ${this.state.patientCity}, ${this.state.patientState} ${this.state.patientZip}`);

    if (!this.state.patientName){
      alert("Please enter the patient's name");
      this.setState({
        redirectTo:""
      })
    } else if (!this.state.patientPhone){
      alert("please enter the patient's phone number");
      this.setState({
        redirectTo: ""
      })
    }else{
		axios
			.post('/auth/addPatient', {
        _id: this.state._id,
        patientName: this.state.patientName,
        patientPhone: this.state.patientPhone,
        patientStreet: this.state.patientStreet,
        patientCity: this.state.patientCity,
        patientState: this.state.patientState,
        patientZip: this.state.patientZip
			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('new patient was added')
          this.setState({
            patientName: "",
            patientPhone: "",
            patientStreet: "",
            patientCity: "",
            patientState: "",
            patientZip: "",
            redirectTo: '/patientProfile'
          })
				} else {
					console.log('error')
				}
			})
    }
  };

  render() {
    return (
      <div>
        <div className ='container'>
          <div className ='row'>
            <div className='col-md-12'>
              <Form className="form">
                  <div className='row'>
                    <FormGroup>
                      <FormControl
                        name="patientName"
                        value={this.state.patientName}
                        onChange={this.handleInputChange}
                        placeholder="Patient's Name"
                      />
                    </FormGroup>
                    <FormGroup>  
                      <FormControl
                        name="patientPhone"
                        value={this.state.patientPhone}
                        onChange={this.handleInputChange}
                        placeholder="Phone"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        name="patientStreet"
                        value={this.state.patientStreet}
                        onChange={this.handleInputChange}
                        placeholder="Street"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        name="patientCity"
                        value={this.state.patientCity}
                        onChange={this.handleInputChange}
                        placeholder="City"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        name="patientState"
                        componentClass="select"
                        value={this.state.patientState}
                        onChange={this.handleInputChange}
                        placeholder="State"
                      >
                        <option value="">Select State</option>
                        <option value="Alabama">Alabama</option>
                        <option value="Alaska">Alaska</option>
                        <option value="Arizona">Arizona</option>
                        <option value="Arkansas">Arkansas</option>
                        <option value="California">California</option>
                        <option value="Colorado">Colorado</option>
                        <option value="Connecticut">Connecticut</option>
                        <option value="Delaware">Delaware</option>
                        <option value="Washington, DC">District Of Columbia</option>
                        <option value="Florida">Florida</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Hawaii">Hawaii</option>
                        <option value="Idaho">Idaho</option>
                        <option value="Illinois">Illinois</option>
                        <option value="Indiana">Indiana</option>
                        <option value="Iowa">Iowa</option>
                        <option value="Kansas">Kansas</option>
                        <option value="Kentucky">Kentucky</option>
                        <option value="Lousisana">Louisiana</option>
                        <option value="Maine">Maine</option>
                        <option value="Maryland">Maryland</option>
                        <option value="Massachusetts">Massachusetts</option>
                        <option value="Michigan">Michigan</option>
                        <option value="Minnesota">Minnesota</option>
                        <option value="Mississippi">Mississippi</option>
                        <option value="Missouri">Missouri</option>
                        <option value="Montana">Montana</option>
                        <option value="Nebraska">Nebraska</option>
                        <option value="Nevada">Nevada</option>
                        <option value="New Hamsphire">New Hampshire</option>
                        <option value="New Jersey">New Jersey</option>
                        <option value="New Mexico">New Mexico</option>
                        <option value="New York">New York</option>
                        <option value="North Carolina">North Carolina</option>
                        <option value="North Dakota">North Dakota</option>
                        <option value="Ohio">Ohio</option>
                        <option value="Oklahoma">Oklahoma</option>
                        <option value="Oregon">Oregon</option>
                        <option value="Pennsylvania">Pennsylvania</option>
                        <option value="Rhode Island">Rhode Island</option>
                        <option value="South Carolina">South Carolina</option>
                        <option value="South Dakota">South Dakota</option>
                        <option value="Tennessee">Tennessee</option>
                        <option value="Texas">Texas</option>
                      </FormControl>
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        name="patientZip"
                        value={this.state.patientZip}
                        onChange={this.handleInputChange}
                        placeholder="Zipcode"
                      />
                    </FormGroup>
                      <Button bsStyle="primary"
                        onClick={this.handleFormSubmit}
                        type="success"
                        className="input-lg"
                      >
                        Add Patient
                      </Button>
                    </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PatientForm;