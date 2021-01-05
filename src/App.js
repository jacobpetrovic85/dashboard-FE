import React, {Component} from 'react';
import * as R from 'ramda';
import moment from 'moment';

import HoursForm from './forms/HoursForm';
import DailyHoursTable from './tables/DailyHoursTable';
import BtcTable from './tables/BtcTable';
import {requests} from './requests/requests';
import {getObj, postDeleteObj} from './requests/methodObjects';
// import {handleBTCRequests} from './requests/calls';

class App extends Component {
  state = {
    DailyHours: this.DailyHours || [],
    DailyBTC_EUR: this.DailyBTC_EUR || [],
    DailyBTC_USD: this.DailyBTC_USD || [],
    HoursFormValue: this.HoursFormValue || {
      // resource: '',
      hours: '',
      day: '',
      id: '',
    },
    // ResourceSelector: this.ResourceSelector,
  }

  async requestLatest () {
    let response = await requests(getObj, "http://localhost:3001/dailyHours/list");
    this.setState({
      DailyHours: response.data.dailyHours
    });
  };

  // TODO: replace lifecycle calls with new *useEffect* not soon to be deprecated ones
  componentWillMount() {
    //Make the first request and then start polling
    this.requestLatest();
    this.startPolling();
    this.handleBTCRequests();
    this.startPollingBTC();
  }
  // TODO: replace lifecycle calls with new *useEffect* not soon to be deprecated ones
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
    await requests(postDeleteObj(entryToRemove, 'DELETE'), 'http://localhost:3001/dailyHours/delete');
  }

  handleBTCRequests = async () => {
    let eurResponse  = await requests(getObj, 'http://localhost:3001/dailyHours/calling/params?start=1&limit=1&convert=EUR');
    this.setState({
      DailyBTC_EUR: eurResponse.data
    });
    let usdResponse = await requests(getObj, 'http://localhost:3001/dailyHours/calling/params?start=1&limit=1&convert=USD');
    this.setState({
      DailyBTC_USD: usdResponse.data
    });
  }

  // handleBTCRequests(this.state);

    handleSubmit = async (input) => {
    this.setState({DailyHours: [...this.state.DailyHours, input]});
    await requests(postDeleteObj(JSON.stringify(input), 'POST'), 'http://localhost:3001/dailyHours/upload');
  }

    submitForm = (props) => {
    this.handleSubmit(this.props.state);
    this.props.setState(this.props.initialState);
    }

    handleChange = (event) => {
      console.log('event = ', event);
      console.log('this.props in handle change', this.props);
      let {name, value} = event.target;
      let date = moment().format('Do MMMM YYYY - HH:mm');
      this.setState({
        HoursFormValue: {
          [name]: value,
          day:date,
        }
      });
    }

  render() {
    let { DailyHours, DailyBTC_USD, DailyBTC_EUR, HoursFormValue } = this.state;
    return (
        <div className="container">
        <HoursForm
      handleSubmit={this.handleSubmit}
      handleChange={this.handleChange}
      submitForm={this.submitForm}
      HoursFormValue={HoursFormValue}
        />
        <DailyHoursTable
      DailyHours={DailyHours}
      removeHours={this.removeHours}
        />
        <BtcTable
      DailyBTC_USD={DailyBTC_USD}
      DailyBTC_EUR={DailyBTC_EUR}
      handleBTCRequests={this.handleBTCRequests}
        />
        </div>
    );
  }
}

export default App;
