import * as R from 'ramda';

let makeComma = (str) => {
  return str.toString().replace(/\./,',');
};

let makeFixed2 = num => Number(num).toFixed(2);

let calcNetWorth = (amount, price) => {
  return (amount * price).toFixed(2);
};

let curriedCalcNetWorth = R.curry(calcNetWorth);

export let isNotNil = R.complement(R.isEmpty);

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

export let makeRow = (row, money, fiatSymbol, fiat) => {
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
