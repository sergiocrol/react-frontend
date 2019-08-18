import React, { Component } from 'react';
import logo from '../images/hitza.svg';

class Header extends Component {
  render() {
    return (
      <nav className="header-container">
        <img src={logo} alt="logo" />
      </nav>
    )
  }
}

export default Header;