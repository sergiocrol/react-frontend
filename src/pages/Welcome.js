import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/hitza.svg';

const Welcome = () => {
  return (
    <div className="login-container u-padding-top-big flex-column">
      <div className="profile-creation-textbox u-margin-top-big flex">
        <img src={logo} alt="logo" />
        <span className="triangle"></span>
      </div>
      <Link className="btn-text u-margin-bottom-medium u-margin-top-big" to="/home">BEGIN &rarr;</Link>
      <Link style={{ textDecoration: 'none' }} to="/login">login</Link>
    </div>
  )
}

export default Welcome;
