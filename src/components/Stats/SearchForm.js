import React, { useState } from 'react';

import Card from '../UI/Card';
import './SearchForm.css';

const SearchForm = React.memo(props => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [isValid, setIsValid] = useState(true)

  const inputChangeHandler = event => {
      setEnteredUsername(event.target.value)

      if(event.target.value.trim().length > 0){
        setIsValid(true)
      }else {
        setIsValid(false)
      }
  }

  const submitHandler = event => {
    event.preventDefault();

    if(enteredUsername.trim().length === 0){
      props.onFetchError()
      setIsValid(false)
      return
    }

    const personalToken = 'eVmIm9GvldV3vY0q';
      
    fetch('https://lichess.org/api/user/'+ enteredUsername, {
      headers: {
        'Authorization': 'Bearer ' + personalToken
      }
    })
    .then(response => {
      return response.json()
    })
    .then(response => {
      props.onFetchData(response)
    })
    .catch(error => {
      props.onFetchError(error)
      setEnteredUsername('')
    })

    fetch(`https://lichess.org/api/user/${enteredUsername}/rating-history`, {
      headers: {
        'Authorization': 'Bearer ' + personalToken,
      }
    })
    .then(response => {
      return response.json()
    })
    .then(response => {
      props.onFetchGameHistory(response)
    })
    }


  return (
    <section className="search-form">
      <h1>Lichess Player Stats</h1>
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label 
            htmlFor="title"
            style={{
              color : !isValid ? 'red' : 'black'
            }}>Enter Username</label>
            <input
              type="text"
              id="title"
              value={enteredUsername}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="search-form__actions">
            <button type="submit">Search</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default SearchForm;
