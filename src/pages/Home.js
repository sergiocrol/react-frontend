import React, { Component } from 'react';
import withAuth from '../components/withAuth.js';
import Navbar from '../components/Navbar.js';
import Header from '../components/Header.jsx';

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="home-search-container">
          <div className="triangle"></div>
        </div>
        <Navbar />
      </div >
    )
  }
}

export default withAuth(Home);