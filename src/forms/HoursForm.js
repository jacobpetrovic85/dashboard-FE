import React from 'react';

let HoursForm = (props) => {
    let {hours} = props.HoursFormValue;
    return (
        <form>
        <label htmlFor="hours">Hours</label>
        <input
      type="number"
      name="hours"
      id="hours"
      value={hours}
      onChange={props.handleChange}
        />
        <input
      type="button"
      value="Submit"
      onClick={props.submitForm}
        />
      </form>
    );
};

export default HoursForm;

      //   <input
      // type="text"
      // name="resource"
      // id="resource"
      // value={resource}
      // onChange={this.handleChange}
      // />
