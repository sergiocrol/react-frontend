import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import heart from '../images/heart.svg';
import search from '../images/search.svg';
import star from '../images/star.svg';
import board from '../images/board.svg';
import profile from '../images/profile.svg';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar-container">
        <Link to="/home"><img src={search} alt="search icon" /></Link>
        <Link to="/dashboard"><img src={board} alt="board icon" /></Link>
        <Link to="/home"><img src={heart} alt="heart icon" /></Link>
        <Link to="/profile"><img src={profile} alt="profile icon" /></Link>
      </nav>
    )
  }
}

export default Navbar;