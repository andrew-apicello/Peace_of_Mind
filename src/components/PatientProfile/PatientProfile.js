import React from 'react';
import axios from 'axios';
import {Row, Col} from "react-bootstrap"


class PatientProfile extends React.Component {
constructor() {
  super()
  this.state = {
      _id: "",
      patientName: "",
      patientPhone: "",
      patientAddress: ""
    }
}
  componentDidMount() {
    axios.get('/auth/patients').then(response => {
      console.log(response.data)
      if (response.data) {
        this.setState({
          _id: response.data._id,
          patientName: response.data.patientName,
          patientPhone: response.data.patientPhone,
          patientStreet: response.data.patientStreet,
          patientCity: response.data.patientCity,
          patientState: response.data.patientState,
          patientZip: response.data.patientZip
        })
      };
    });
  }

  render() {
    return (
      <div classNAme="patientProfile">
        <h2>Your Patient:</h2>
        <p id="patientName"><strong>Name: </strong>{this.state.patientName}</p>
        <p><strong>Phone: </strong>{this.state.patientPhone}</p>
        <p><strong>Address: </strong>{this.state.patientStreet}, {this.state.patientCity}, {this.state.patientState} {this.state.patientZip}</p>
      </div>
    );
  }
}

export default PatientProfile;