import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import heart from '../images/heart.svg';
import search from '../images/search.svg';
import star from '../images/star.svg';
import profile from '../images/profile2.svg';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar-container">
        <Link to=""><img src={search} alt="search icon" /></Link>
        {/* <img src={mail} alt="mail icon" /> */}
        <Link to="/dashboard"><img src={star} alt="star icon" /></Link>
        <Link to=""><img src={heart} alt="heart icon" /></Link>
        <Link to=""><img src={profile} alt="profile icon" /></Link>
      </nav>
    )
  }
}

export default Navbar;