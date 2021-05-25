import React, { useState} from 'react';

import {Line} from 'react-chartjs-2';
import './EloChart.css';


const EloChart = props => {

  

  const today = new Date();
  const mm = String(today.getMonth()+1)

  let monthArray = ["January","February","March","April","May","June",
            "July","August","September","October","November","December"];
  let currMonth = mm; 

  const currentMonthLabels = (period) => {
    let firstMonth = currMonth - period;

    if(firstMonth < 0){
        let months = [];
        months.push(monthArray.slice(12 - Math.abs(firstMonth), 12));
        months.push(monthArray.slice(0, currMonth));
        let result = months[0].concat(months[1])
        return result
    }else{
        return monthArray.slice(firstMonth, currMonth)
    }

    
  }

  const [selectedLabels, setSelectedLabels] = useState(currentMonthLabels(6))
  const [numResults, setNumResults] = useState(6)
  const [selectedButton, setSelectedButton] = useState(0)
  const [gameType, setGameType] = useState(0)

  let dataHistory = '';
  let dataElo = []

  const numberOfResults = (number) => {
    if(props.data !== ''){

    dataHistory = props.data

    
    
    let lng = dataHistory[gameType].points.length
    
    let count = number
    let x
    for(let i=0; i<number; i++){
      x = lng - count 
      if(x<=0){
        return;
      }else{
        dataElo.push(dataHistory[gameType].points[lng-count][3])
      count = count - 1;
      }
      
    }
  }
  }
  
  numberOfResults(numResults)

  
  const selectTimeHandler = event => {

    let selectedPeriod = event.target.value
    const newLabels = currentMonthLabels(selectedPeriod)
    setSelectedLabels(newLabels)
    setNumResults(selectedPeriod)
  }


  let chartData = {
    labels: selectedLabels,
    datasets: [
      {
        label: 'elo',
        data: dataElo,
        fill: true,
        borderColor: '#ff2058',
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)'
        ],
        borderWidth: 4
      }
      ]
    }

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 6
          },
          gridLines: {
            display: true
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: true
          }
        }
      ]

    }
  }

  const buttonClickHandler = event => {
    event.target.style.backgroundColor= "rgb(207, 245, 255)"
    event.target.style.color= "black"

    setSelectedButton(event.target.value)
    setGameType(parseInt(event.target.value))
  }

  let selected = {
    backgroundColor: "rgb(207, 245, 255)", 
    color: "black"
  }

  return (
    <section className="elo-chart">
      <div>
          <button value="0" style={selectedButton == 0 ? selected: null} onClick={buttonClickHandler}>Bullet</button> 
          <button value="1" style={selectedButton == 1 ? selected: null} onClick={buttonClickHandler}>Blitz</button> 
          <button value="2" style={selectedButton == 2 ? selected: null} onClick={buttonClickHandler}>Rapid</button>
      </div>    
      <h2>Elo Chart</h2>
        <select onChange={selectTimeHandler} defaultValue="6">
          <option value="1">Last month</option>
          <option value="3">Last 3 months</option>
          <option value="6">Last 6 months</option>
          <option value="12">Last year</option>
        </select>
        <div className="canvas">
        <Line 
        data={chartData}
        options={chartOptions}
         />
        </div>
    </section>
  );
};

export default EloChart;


