import React, {Component} from 'react';
import Moment from 'react-moment';
import moment from 'moment';


class HoursForm extends Component {

  initialState = {
    resource: '',
    hours: '',
    day: '',
    id: '',
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
    let {hours, resource} = this.state;
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
                <input
      type="text"
      name="resource"
      id="resource"
      value={resource}
      onChange={this.handleChange}
      />
        <input type="button" value="Submit" onClick={this.submitForm} />
      </form>
    );
  }
}

export default HoursForm;
      //   <input
      // type="text"
      // name="resource"
      // id="resource"
      // value={resource}
      // onChange={this.handleChange}
      // />
//<Moment format="Do MMMM YYYY - HH:mm">{dateToFormat}</Moment>
