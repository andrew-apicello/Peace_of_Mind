import React from 'react';
import axios from 'axios';


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
          patientAddress: response.data.patientAddress
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
              <p id="patientName">Name: {this.state.patientName}</p>
              <p>Phone: {this.state.patientPhone}</p>
              <p>Address: {this.state.patientAddress}</p>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PatientProfile;