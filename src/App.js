import React, {Component} from 'react';
import HoursForm from './HoursForm';
import Table from './Table';
import BTCTable from './BTCTable';
import * as R from 'ramda';
import requests from './requests';



class App extends Component {
  state = {
    DailyHours: this.DailyHours || [],
    DailyBTC: this.DailyBTC || [],
  }

  async requestLatest () {
    let response = await requests('', R.dissoc('body')(), 'GET', 'application/json')("http://localhost:3001/dailyHours/list")
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
  startPollingBTC = () => this.interval = setInterval(this.handleBTCRequest.bind(this), 900000);

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
    requests(entryToRemove, R.identity, 'DELETE', 'application/json')('http://localhost:3001/dailyHours/delete');
  }


  handleSubmit = (input) => {
    this.setState({DailyHours: [...this.state.DailyHours, input]});
    requests(JSON.stringify(input), R.identity, 'POST', 'application/json')('http://localhost:3001/dailyHours/upload');
  }

  handleBTCRequest = () => {
    requests('', R.dissoc('body')(), 'GET', 'application/json')('https://blockchain.info/ticker')
      .then(responseJson=> {
        console.log("responseJson = ", responseJson);
        this.setState({
          DailyBTC: [responseJson.EUR]
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
