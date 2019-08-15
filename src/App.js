import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from "firebase";

import PrivateRoute from './components/PrivateRoute.js';
import AnonRoute from './components/AnonRoute.js';

import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Home from './pages/Home';

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
              <AnonRoute exact path="/login" component={Login} />
              <Route exact path="/home" component={Home} />
              <PrivateRoute exact path="/profile" component={Profile} />
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    )
  }
}

export default App;
