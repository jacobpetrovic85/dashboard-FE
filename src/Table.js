import React, {Component} from 'react';

let TableHeader = () => {
  return (
      <thead>
      <tr>
      <th>Resource</th>
      <th>Hours</th>
      <th>Day/Time</th>
      <th></th>
      </tr>
      </thead>
  );
};


let TableBody = (props) => {
  const rows = props.DailyHours.map((row,index) => {
    return (
          <tr key={row.id}>
          <td>{row.resource}</td>
          <td>{row.hours}</td>
          <td>{row.day}</td>
          <td><button onClick={() => props.removeHours(row.id)}>Delete</button></td>
          </tr>);
  });
  return <tbody>{rows}</tbody>;
};

class Table extends Component {
  render() {
    const {DailyHours,removeHours} = this.props;
    return (
      <table>
        <TableHeader />
        <TableBody DailyHours={DailyHours} removeHours={removeHours}/>
      </table>
    );
  }
}

export default Table;
