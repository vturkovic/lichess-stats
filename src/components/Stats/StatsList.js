import React from 'react';

import './StatsList.css';

const StatsList = props => {

  let Output = [];
  if(props.data !== ''){
    Output =
    <li>
      <span>Win: {props.data.count.win}</span>
      <span>Draw: {props.data.count.draw}</span>
      <span>Lose: {props.data.count.loss}</span>
    </li>;
  }

  return (
    <section className="stats-list">
      <h2>Stats</h2>
      <ul>
          {Output}
      </ul>
    </section>
  );
};

export default StatsList;


// {props.ingredients.map(ig => (
//   <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
//     <span>{ig.title}</span>
//     <span>{ig.amount}x</span>
//   </li>))}