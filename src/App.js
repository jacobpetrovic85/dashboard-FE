import React, {Component} from 'react';
import HoursForm from './HoursForm';
import Table from './Table';
import BTCTable from './BTCTable';
import * as R from 'ramda';
import requests from './requests';


// GET
let getObj = {
  method: 'GET',
  headers: {
    'Content-type': 'application/json'
  }
};

// GET API
let getApiObj = {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
    'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c',
    'Accept-Encoding': 'gzip'
  }
};

// POST
let postDeleteObj = (data, method) => {
  return {
    method: 'method',
  headers: {
    'Content-type': 'application/json'
  },
    body: data
  };
};

class App extends Component {
  state = {
    DailyHours: this.DailyHours || [],
    DailyBTC: this.DailyBTC || [],
  }

  async requestLatest () {
    let response = await requests(getObj, "http://localhost:3001/dailyHours/list")
      .then(responseJson=> {
        this.setState({
          DailyHours: responseJson.data.dailyHours
        });
      });
  };


  componentWillMount() {
    //Make the first request and then start polling
    this.requestLatest();
    this.startPolling();
    this.handleBTCRequest();
    this.startPollingBTC();
  }

  componentWillUnmount() {
    this.stopPolling();
  }

  startPolling = () => this.interval = setInterval(this.requestLatest.bind(this), 10000);
  startPollingBTC = () => this.interval = setInterval(this.handleBTCRequest.bind(this), 600000);

  stopPolling = () => {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

  removeHours = (id) => {
    let {DailyHours} =  this.state;
    this.setState({
      DailyHours: DailyHours.filter((day, i) => {
        return day.id !== id;
      })
    });
    let entryToRemove = JSON.stringify(R.filter(R.propEq('id', id), DailyHours)[0]);
    requests(postDeleteObj(entryToRemove, 'DELETE'), 'http://localhost:3001/dailyHours/delete');
  }

  handleSubmit = (input) => {
    this.setState({DailyHours: [...this.state.DailyHours, input]});
    requests(postDeleteObj(JSON.stringify(input), 'POST'), 'http://localhost:3001/dailyHours/upload');
  }

  handleBTCRequest = () => {
    requests(getObj, 'http://localhost:3001/dailyHours/calling/params?start=1&limit=1&convert=EUR')
      .then(responseJson=> {
        console.log("responseJson = ", responseJson);
        this.setState({
          DailyBTC: responseJson.data
        });
      });
  }

  render() {
    let {DailyHours, DailyBTC} = this.state;
    return (
        <div className="container">
        <HoursForm handleSubmit={this.handleSubmit}/>
        <Table DailyHours={DailyHours} removeHours={this.removeHours} />
        <BTCTable DailyBTC={DailyBTC} handleBTCRequest={this.handleBTCRequest}/>
        </div>
    );
  }
}

export default App;

// API key => d9e29c8b-e083-4337-a278-668aa1689477
// COINMARKETCAP KEY d9e29c8b-e083-4337-a278-668aa1689477
// curl -H "X-CMC_PRO_API_KEY: d9e29c8b-e083-4337-a278-668aa1689477" -H "Accept: application/json" -d "start=1&limit=1&convert=EUR" -G https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest
// https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=1&convert=EUR
// const rp = require('request-promise');
// const requestOptions = {
//   method: 'GET',
//   uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
//   qs: {
//     'start': '1',
//     'limit': '5000',
//     'convert': 'USD'
//   },
//   headers: {
//     'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c'
//   },
//   json: true,
//   gzip: true
// };

// rp(requestOptions).then(response => {
//   console.log('API call response:', response);
// }).catch((err) => {
//   console.log('API call error:', err.message);
// });
