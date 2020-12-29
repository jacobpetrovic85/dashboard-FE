import React, {Component} from 'react';
import HoursForm from './HoursForm';
import Table from './Table';
// import handleSave from './saveFile';
// import Form from './Form';



class App extends Component {
  state = {
    DailyHours: this.DailyHours || [],
  }

  requestLatest () {
    fetch("http://localhost:3001/dailyHours/list")
      .then(response => response.json())
      .then(responseJson=> {
        this.setState({
          DailyHours: responseJson.data
        });
      });
  };


  componentWillMount() {
    //Make the first request and then start polling
    this.requestLatest();
    this.startPolling();
  }

  componentWillUnmount() {
    this.stopPolling();
  }

  startPolling = () => this.interval = setInterval(this.requestLatest.bind(this), 5000);

  stopPolling = () => {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

  removeHours = (index) => {
    let {DailyHours} =  this.state;
    console.log('running');
    this.setState({
      DailyHours: DailyHours.filter((hours, i) => {
        return i !== index;
      })
    });
  }

  handleSubmit = (input) => {
    this.setState({DailyHours: [...this.state.DailyHours, input]});
  }

  render() {
    let {DailyHours} = this.state;
    return (
        <div className="container">
        <HoursForm handleSubmit={this.handleSubmit}/>
        <Table DailyHours={DailyHours} removeHours={this.removeHours} />
        </div>
    );
  }
}

export default App;
