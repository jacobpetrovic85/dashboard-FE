import React, {Component} from 'react';
import Moment from 'react-moment';
import moment from 'moment';


class HoursForm extends Component {

  initialState = {
    day: '',
    hours: '',
  }
  state = this.initialState;

  handleChange = (event) => {
    let {name, value} = event.target;
    let date = moment().format('Do MMMM YYYY - HH:mm');
    this.setState({
      [name]: value,
      day:date,
    });
  }

  submitForm = () => {
    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  }

  render() {
    let {hours} = this.state;
    const dateToFormat = new Date();
    return (
        <form>
        <label htmlFor="hours">Hours</label>
        <input
      type="number"
      name="hours"
      id="hours"
      value={hours}
      onChange={this.handleChange}
      />
        <input type="button" value="Submit" onClick={this.submitForm} />
        <Moment format="Do MMMM YYYY - HH:mm">{dateToFormat}</Moment>
      </form>
    );
  }
}

export default HoursForm;
