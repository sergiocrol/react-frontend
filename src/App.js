import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from "firebase";

import PrivateRoute from './components/PrivateRoute.js';
import AnonRoute from './components/AnonRoute.js';

import FillProfile from './pages/FillProfile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PillNew from './pages/PillNew';
import PillCreate from './pages/PillCreate';
import PillPage from './pages/PillPage.js';
import PillPlay from './pages/PillPlay.js';
import PillResult from './pages/PillResult.js';

import AuthProvider from './contexts/auth-context.js';

import './App.css';

const config = {
  apiKey: "AIzaSyADF44NqjmEwJuxTkLIewfTLEj_Z2ZYK4c",
  authDomain: "hitza-97861.firebaseapp.com",
  storageBucket: "gs://hitza-97861.appspot.com"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <div>
            <Switch>
              <AnonRoute exact path="/" component={Welcome} />
              <AnonRoute exact path="/signup" component={Signup} />
              <PrivateRoute exact path="/profile" component={FillProfile} />
              <AnonRoute exact path="/login" component={Login} />
              <Route exact path="/home" component={Home} />
              {/* <PrivateRoute exact path="/profile" component={Profile} /> */}
              <Route exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/pills/:id/create" component={PillCreate} />
              <PrivateRoute exact path="/pills/new" component={PillNew} />
              <PrivateRoute exact path="/pills/:id" component={PillPage} />
              <PrivateRoute exact path="/pills/:id/play" component={PillPlay} />
              <PrivateRoute exact path="/pills/:id/play/result" component={PillResult} />
            </Switch>
          </div>
        </Router>
      </AuthProvider>

    )
  }
}

export default App;
