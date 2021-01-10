import React from 'react';

import {makeRow, isNotNil} from '../tables/TableLogic.js';

let TableHeader = () => {
  return (
      <thead>
      <tr>
        <th>BTC Price</th>
        <th>BTC owned</th>
        <th>Asset value</th>
        <th>Invested</th>
        <th>Gained</th>
      </tr>
      </thead>
  );
};

let TableBody = (props) => {
  const {DailyBTC_EUR, DailyBTC_USD} = props;
  if (isNotNil(DailyBTC_EUR) && isNotNil(DailyBTC_USD)){
    const rowEUR = makeRow(DailyBTC_EUR.data[0],3800, '\u20AC', 'EUR');
    const rowUSD = makeRow(DailyBTC_USD.data[0],(3800*1.23), '\u0024', 'USD');
    return <tbody>{rowEUR}{rowUSD}</tbody>;
  } else {
    return<tbody></tbody>;
  }
};

let BtcTable = (props) => {
  const {DailyBTC_USD, DailyBTC_EUR} = props;
  return (
      <table>
        <TableHeader />
        <TableBody DailyBTC_USD={DailyBTC_USD} DailyBTC_EUR={DailyBTC_EUR}/>
      </table>
  );
};

export default BtcTable;
