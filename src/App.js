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
      .then(response => {
        console.log("response = ", response);
        return response.json();
      })
      .then(responseJson=> {
        console.log("responseJson = ", responseJson);
        this.setState({
          DailyHours: responseJson.data.dailyHours
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

  removeHours = (id) => {
    let {DailyHours} =  this.state;
    this.setState({
      DailyHours: DailyHours.filter((day, i) => {
        return day.id !== id;
      })
    });
  }

  uploadNewEntry = async (url, data) => {
    console.log("data = ", data);
    // Awaiting for fetch response and
    // defining method, headers and body
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Awaiting response.json()
    const resData = await response.json();

    // Returning result data
    return resData;
  }

  handleSubmit = (input) => {
    console.log("input = ", input);
    this.setState({DailyHours: [...this.state.DailyHours, input]});
    this.uploadNewEntry('http://localhost:3001/dailyHours/upload', input);
    // this.requestLatest();
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
