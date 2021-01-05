import React, {Component} from 'react';
import HoursForm from './HoursForm';
import Table from './Table';
import BTCTable from './BTCTable';
import * as R from 'ramda';
import * as req from './requests';
// import xmlRequests from './requests';


// GET
let getObj = {
  method: 'GET',
  headers: {
    'Content-type': 'application/json'
  }
};

// TODO: Factor these out
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
    DailyBTC_EUR: this.DailyBTC_EUR || [],
    DailyBTC_USD: this.DailyBTC_USD || [],
    // ResourceSelector: this.ResourceSelector,
  }

  async requestLatest () {
    let response = await req.requests(getObj, "http://localhost:3001/dailyHours/list");
    this.setState({
      DailyHours: response.data.dailyHours
    });
  };

  // TODO: replace lifecycle calls with new not soon to be deprecated ones
  componentWillMount() {
    //Make the first request and then start polling
    this.requestLatest();
    this.startPolling();
    this.handleBTCRequests();
    this.startPollingBTC();
  }
  // TODO: replace lifecycle calls with new not soon to be deprecated ones
  componentWillUnmount() {
    this.stopPolling();
  }

  startPolling = () => this.interval = setInterval(this.requestLatest.bind(this), 10000);
  startPollingBTC = () => this.interval = setInterval(this.handleBTCRequests.bind(this), 600000);

  stopPolling = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  removeHours = async (id) => {
    let {DailyHours} =  this.state;
    this.setState({
      DailyHours: DailyHours.filter((day, i) => { // TODO factor out
        return day.id !== id;
      })
    });
    let entryToRemove = JSON.stringify(R.filter(R.propEq('id', id), DailyHours)[0]);
    await req.requests(postDeleteObj(entryToRemove, 'DELETE'), 'http://localhost:3001/dailyHours/delete');
  }

  handleSubmit = async (input) => {
    this.setState({DailyHours: [...this.state.DailyHours, input]});
    await req.requests(postDeleteObj(JSON.stringify(input), 'POST'), 'http://localhost:3001/dailyHours/upload');
  }

  handleBTCRequests = async () => {
    let eurResponse  = await req.requests(getObj, 'http://localhost:3001/dailyHours/calling/params?start=1&limit=1&convert=EUR');
    this.setState({
      DailyBTC_EUR: eurResponse.data
    });
    let usdResponse = await req.requests(getObj, 'http://localhost:3001/dailyHours/calling/params?start=1&limit=1&convert=USD');
    this.setState({
      DailyBTC_USD: usdResponse.data
    });
  }

  render() {
    let {DailyHours, DailyBTC_USD, DailyBTC_EUR} = this.state;
    return (
        <div className="container">
        <HoursForm handleSubmit={this.handleSubmit}/>
        <Table DailyHours={DailyHours} removeHours={this.removeHours} />
        <BTCTable DailyBTC_USD={DailyBTC_USD} DailyBTC_EUR={DailyBTC_EUR} handleBTCRequests={this.handleBTCRequests}/>
        </div>
    );
  }
}

export default App;
