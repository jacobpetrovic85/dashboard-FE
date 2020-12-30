import React, {Component} from 'react';

let TableHeader = () => {
  return (
      <thead>
        <tr>
          <th>Hours</th>
        </tr>
        <tr>
          <th></th>
        </tr>
        <tr>
          <th></th>
        </tr>
      </thead>
  );
};


let TableBody = (props) => {
  const rows = props.DailyHours.map((row,index) => {
    console.log("row = ", row);
      return (
      <tr key={row.id}>
        <td>{row.hours}</td>
        <td><button onClick={() => props.removeHours(row.id)}>Delete</button></td>
        <td>{row.day}</td>
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
