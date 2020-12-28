import React, {Component} from 'react';
import HoursForm from './HoursForm';
import Table from './Table';
// import handleSave from './saveFile';
// import Form from './Form';



class App extends Component {
  state = {
    DailyHours: [],
  }

  // state = {
  //   characters: [],
  // }

  // removeCharacter = (index) => {
  //   let {characters} =  this.state;
  //   console.log('running');
  //   this.setState({
  //     characters: characters.filter((character, i) => {
  //       return i !== index;
  //     })
  //   });
  // }

  // handleSubmit = (character) => {
  //   this.setState({characters: [...this.state.characters, character]});
  // }

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
    console.log("input = ", input);
    this.setState({DailyHours: [...this.state.DailyHours, input]});
  }

  render() {
    let {DailyHours} = this.state;
    // let {characters} =  this.state;
    return (
        <div className="container">
        <HoursForm handleSubmit={this.handleSubmit}/>
        <Table DailyHours={DailyHours} removeHours={this.removeHours} />
        </div>
    );
    // return (
    //     <div className="container">
    //     <Form handleSubmit={this.handleSubmit} />
    //     <Table characterData={characters} removeCharacter={this.removeCharacter} />
    //     </div>
    // );
  }
}

export default App;
