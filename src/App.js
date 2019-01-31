import React, { Component } from 'react';
import LoginComponent from './components/login'
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import HomePage from './components/homepage'
import RegistrationPage from './components/register'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h2> Contact manager </h2>
          <Switch>
            <Route path='/' component={LoginComponent} exact/>
            <Route path='/homepage' component={HomePage} exact/>
            <Route path='/register' component = {RegistrationPage} exact/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
