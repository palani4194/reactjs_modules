import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Pie,Bar } from 'react-chartjs-2';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: undefined
    }
  }
  componentDidMount () {
    fetch("http://palani-blog.herokuapp.com/api/chart/data/").then(resp => resp.json()).then(data => {
      let gender = data['0'];
      let sexValues = gender.sex_values;
      gender = {
        labels: ["Male","Female"],

        datasets: [{
            data: [sexValues[0], sexValues[1]],
            backgroundColor: [
              '#36A2EB',
              '#FFCE56'
            ],
            hoverBackgroundColor: [
              '#36A2EB',
              '#FFCE56'
            ]
        }]
      }
      let relation=data[1];
      let relationValues=relation.relation_values;
      relation = {
        labels: ["Wife", "Own-Child","Husband","Not-in-family","Other-relative","Unmarried"],

        datasets: [{
          data: [relationValues[0], relationValues[1], relationValues[2], relationValues[3], relationValues[4], relationValues[5]],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
           "#ff6861",
           "#cf61ff"
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            "#ff6861"
          ]
        }]
      }
      this.setState({ gender: gender,relation:relation })
  });
}
render() {
  return (
    <div className="App">
    <center>Relationship Chart</center>
    {this.state.relation ? <Bar data={this.state.relation} ></Bar> : ""}
    <center>Males and Females Chart</center>

      {this.state.gender ? <Pie data={this.state.gender} ></Pie> : ""}
    </div>

  );
}
}

export default App;
