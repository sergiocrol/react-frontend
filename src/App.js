import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from "firebase";

import PrivateRoute from './components/PrivateRoute.js';
import AnonRoute from './components/AnonRoute.js';

import Profile from './pages/Profile';
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

import AuthProvider from './contexts/auth-context.js';

import './App.css';

const config = {
  apiKey: "AIzaSyDYjroyVUMiI8GrLAZowsCndKIA6OtXJPk",
  authDomain: "upload-react-images.firebaseapp.com",
  storageBucket: "gs://upload-react-images.appspot.com/"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <div>
            <Switch>
              <AnonRoute exact path="/" component={Welcome} />
              <AnonRoute exact path="/signup" component={Signup} />
              <PrivateRoute exact path="/signup/profile" component={FillProfile} />
              <AnonRoute exact path="/login" component={Login} />
              <Route exact path="/home" component={Home} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <Route exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/pills/:id/create" component={PillCreate} />
              <PrivateRoute exact path="/pills/new" component={PillNew} />
              <PrivateRoute exact path="/pills/:id" component={PillPage} />
              <PrivateRoute exact path="/pills/:id/play" component={PillPlay} />
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    )
  }
}

export default App;
