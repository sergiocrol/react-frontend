import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import Navbar from './components/Navbar.js';
import PrivateRoute from './components/PrivateRoute.js';
import AnonRoute from './components/AnonRoute.js';

import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Home from './pages/Home';

import AuthProvider from './contexts/auth-context.js';

import './App.css';

class App extends Component {
  state = {
    localeProp: 'en'
  }

  changeLanguage = (lang) => {
    this.setState({
      localeProp: lang
    })
    console.log(this.state.localeProp)
  }

  render() {
    return (
      <IntlProvider locale={this.state.localeProp}>
        <Router>
          <AuthProvider>
            <div>
              <Navbar language={this.changeLanguage} />
              <Switch>
                <AnonRoute exact path="/" component={Welcome} />
                <AnonRoute exact path="/signup" component={Signup} />
                <AnonRoute exact path="/login" component={Login} />
                <Route exact path="/home" component={Home} />
                <PrivateRoute exact path="/private" component={Private} />
              </Switch>
            </div>
          </AuthProvider>
        </Router>
      </IntlProvider>
    )
  }
}

export default App;
