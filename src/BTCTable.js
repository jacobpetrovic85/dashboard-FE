import requests from './requests';
import React, {Component} from 'react';

let TableHeader = () => {
  return (
      <thead>
      <tr>
      <th>BTC Price</th>
      <th>BTC owned</th>
      <th>Asset in EUR</th>
      <th></th>
      </tr>
      </thead>
  );
};

let TableBody = (props) => {
  const rows = props.DailyBTC.map((row,index) => {
    console.log("row = ", row);
    return (
        <tr key={row}>
        <td>{row.symbol}{row.last}</td>
        <td>0.19638805</td>
        <td>{row.symbol}{(0.19638805 * row.last).toFixed(2)}</td>
        </tr>);
  });
  return <tbody>{rows}</tbody>;
};

class BTCTable extends Component {
  render() {
    const {DailyBTC} = this.props;
    return (
      <table>
        <TableHeader />
        <TableBody DailyBTC={DailyBTC}/>
      </table>
    );
  }
}

export default BTCTable;

// COINMARKETCAP KEY d9e29c8b-e083-4337-a278-668aa1689477