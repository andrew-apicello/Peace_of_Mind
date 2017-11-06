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
    const id = this.props.user._id;
    axios.get('/auth/patients/' + id).then(response => {

      console.log(response.data)
      if (response.data) {
        this.setState({
          _id: response.data[0]._id,
          patientName: response.data[0].patientName,
          patientPhone: response.data[0].patientPhone,
          patientAddress: response.data[0].patientAddress
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