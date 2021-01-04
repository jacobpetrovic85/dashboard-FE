import requests from './requests';
import React, {Component} from 'react';
import * as R from 'ramda';

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

let makeComma = (str) => {
  return str.toString().replace(/\./,',');
};

let makeFixed2 = num => Number(num).toFixed(2);

let calcNetWorth = (amount, price) => {
  return (amount * price).toFixed(2);
};

let curriedCalcNetWorth = R.curry(calcNetWorth);

let isNotNil = R.complement(R.isEmpty);

let formatCalcNumber = (amount, price) => R.compose(
  makeComma,
  curriedCalcNetWorth(amount))
(price);

let formatGainsCalcNumber = (amount, price, money) => R.compose(
  makeComma,
  x => (x - money).toFixed(2),
  curriedCalcNetWorth(amount))
(price);

let BTCprice = (row, fiat) => R.compose(
  R.prop('price'),
  R.prop(fiat),
  R.prop('quote'))
(row);

let makeRow = (row, money, fiatSymbol, fiat) => {
  console.log("row = ", row);
  let price = BTCprice(row,fiat);
  return (
      <tr>
      <td>{fiatSymbol}{R.compose(makeComma,makeFixed2)(price)}</td>
      <td>0,23833482</td>
      <td>{fiatSymbol}{formatCalcNumber(0.23833482, price)}</td>
      <td>{fiatSymbol}{makeComma(money.toFixed(2))}</td>
      <td>{fiatSymbol}{formatGainsCalcNumber(0.23833482, price, money)}</td>
      </tr>);
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

class BTCTable extends Component {
  render() {
    const {DailyBTC_USD, DailyBTC_EUR} = this.props;
    return (
      <table>
        <TableHeader />
            <TableBody DailyBTC_USD={DailyBTC_USD} DailyBTC_EUR={DailyBTC_EUR}/>
      </table>
    );
  }
}

export default BTCTable;
