import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../components/withAuth.js';
import Navbar from '../components/Navbar.js';
import Header from '../components/Header.jsx';
import auth from '../images/auth.svg';

class Dashboard extends Component {
  render() {
    console.log(this.props);

    return (
      <div>
        <Header />
        <div className="dashboard-container">
          {
            this.props.user.email ? (
              <div className="dashboard-container-body">
                <h3>Dashboard</h3>
                <Link to={{ pathname: "/pills/new", props: this.props }}>+ new pill</Link>
              </div>
            ) : (
                <div className="not-logged-message">
                  <img src={auth} alt="login logo" />
                  <div className="profile-creation-textbox">
                    <p className="profile-creation-textbox-text">Please, login to get access to your dashboard</p>
                    <span className="triangle"></span>
                  </div>
                  <Link to=""> <a href="#0" className="btn-text" >LOGIN&rarr;</a> </Link>
                </div>
              )
          }
        </div>
        <Navbar />
      </div >
    )
  }
}

export default withAuth(Dashboard);
