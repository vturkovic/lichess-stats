import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Stats from './components/Stats/Stats';
import Login from './components/Login/Login'
import classes from './App.module.css';

const App = props => {
  return (
      <div className={classes.App}>
        <BrowserRouter>
          <Switch>
          <Route path="/login" component={Login} />
            <Route path="/" exact component={Stats} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </div>
  )
};

export default App;
