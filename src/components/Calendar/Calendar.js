import React from 'react';
import Button from "../Button/Button"
import Input from "../Input/Input"


class Calendar extends React.Component {
state = {
    medicationsSearch: ""
  };

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
    console.log(this.state.medicationsSearch);

		fetch('/addMedication', { 
		        method: 'POST',
		        data: {
		          name: this.state.medicationsSearch
		        }
		      })
		      .then(function(response) {
		        console.log(response);
		      }).then(function(body) {
		        console.log(body);
		      });
  };

  render() {
    return (
      <div>
        <div class ='container'>
          <div class='row'>
            <div class='col-md-12'>
              <form>
                  <div class='row'>
                      <Input
                        name="medicationsSearch"
                        value={this.state.medicationsSearch}
                        onChange={this.handleInputChange}
                        placeholder="Search For a Medication"
                      />
                      <Button
                        onClick={this.handleFormSubmit}
                        type="success"
                        className="input-lg"
                      >
                        Search
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

export default Calendar;