import React, { useEffect, useState } from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar'

import SearchForm from './SearchForm';
import StatsList from './StatsList';
import EloChart from './EloChart'

import ErrorModal from '../UI/ErrorModal'
// import Filter from './Filter';


const Stats = () => {
  const [dataState, setDataState] = useState('');
  const [dataHistoryState, setDataHistoryState] = useState('');
  const [show, setShow] = useState(false)
  const [error, setError] = useState();

  let statsComponent = '';
    if (show) {
      statsComponent = 
      <React.Fragment>
        <EloChart data={dataHistoryState} />
        <StatsList data={dataState}/>
      </React.Fragment>
    } 

  const fetchDataHandler = data => {
    setShow(true)
    setDataState(data)
    localStorage.setItem("show",true)
    localStorage.setItem('data',JSON.stringify(data));
    
  }

  const fetchGameHistoryHandler = data => {
    setDataHistoryState(data)
    localStorage.setItem('dataHistory',JSON.stringify(data));

    // let proba = JSON.parse(localStorage.getItem('dataHistory'))
    // console.log(JSON.parse(proba))
  }

  const fetchErrorHandler = fetchedError => {
    setShow(false)
    setError(fetchedError)
  }

  const modalCloseHandler = () => {
    setError(undefined)
    setDataState('')
  }

  useEffect(()=>{
    let data
    let dataHistory
    if(localStorage.getItem("show")){
      setShow(true)
      data = JSON.parse(localStorage.getItem("data"))
      setDataState(data)
      dataHistory = JSON.parse(localStorage.getItem("dataHistory"))
      setDataHistoryState(dataHistory)
    }
  }, [])

  return (
    <div className="App">
      <Toolbar />
      <SearchForm onFetchData={fetchDataHandler} onFetchGameHistory={fetchGameHistoryHandler} onFetchError={fetchErrorHandler}/>
      {error && <ErrorModal message="Could not find user!" onClose={modalCloseHandler}/> }
      <section>
        {statsComponent}
        {/* <StatsList data={dataState}/> */}
      </section>
    </div>
  );
};

export default Stats;
