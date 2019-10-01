import React, { Component } from 'react'

import User from '../services/user-service.js';

class UserBox extends Component {
  state = {
    profileImage: '',
    name: '',
    location: '---',
    age: '',
    score: 0,
    takenPills: []
  }

  componentDidMount() {
    User.getOneUser(this.props.user._id)
      .then(user => {
        const { profileImage, name, location, age, score, takenPills } = user;
        this.setState({
          profileImage,
          name,
          location,
          age,
          score,
          takenPills
        }, () => { this.calculateAge(this.state.age) })
      })
  }

  calculateAge = (birthday) => {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    this.setState({
      age
    })
  }

  render() {
    const { profileImage, name, location, age, score, takenPills } = this.state;
    const { position } = this.props;
    return (
      <div className="user-card">
        <div className="user-card-picture" style={{ backgroundImage: `url(${profileImage})` }}></div>
        <div className="user-card-info">
          <p className="user-card-info-name">{name}</p>
          <p className="user-card-info-location"><span>{location === undefined || location.trim() === '' ? '---' : location}</span> &nbsp;|&nbsp; <span className="user-card-info-age">{age}</span></p>
        </div>
        <div className="user-card-score">
          <p className="user-card-score-position">{position}</p>
          <p className="user-card-score-score">{score}</p>
        </div>
      </div>
    )
  }
}

export default UserBox;