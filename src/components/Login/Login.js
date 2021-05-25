import React from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar'
import LoginForm from '../Login/LoginForm'

const Login = () => {

  const fetchErrorHandler = fetchedError => {
    console.log(fetchedError)
  }

  return (
    <div className="App">
      <Toolbar />
      <LoginForm onFetchError={fetchErrorHandler}/>
    </div>
  );
};

export default Login;
