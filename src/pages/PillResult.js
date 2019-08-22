import { Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import withAuth from '../components/withAuth.js';
import Navbar from '../components/Navbar.js';
import Header from '../components/Header.jsx';
import pillService from '../services/pill-service.js';
import win from '../images/win.svg';

class PillResult extends Component {
  state = {
    pill: {},
    score: 0,
    rate: 0,
    redirect: false
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    let users = [];
    this.props.currentUser()
      .then(user => {
        user.takenPills.filter(el => {
          if (el.pill === id) {
            users.push(el);
            console.log(users)
            return users;
          } else {
            return null
          }
        })
        this.setState({
          score: users[users.length - 1].score
        })
      })

  }

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({
      rate: event.target.value
    })
  }

  click = () => {
    pillService.rating(this.props.match.params.id, this.state.rate)
      .then(pill => {
        this.setState({
          redirect: true
        })
      })
  }


  render() {
    if (this.state.redirect) { return <Redirect to='/home' /> }
    return (
      <div className="container-pill u-padding-top-big">
        <Header />
        <div className="container-content">
          <h1>Well done!</h1>
          <h3 className="u-margin-bottom-medium">You have finished one Pill!</h3>
          <img className="result-image u-margin-bottom-medium" src={win} alt="score" />
          <div className="score-container">
            <p className="score-title">your score:  </p>
            <p className="score-result">{this.state.score}</p>
          </div>
          <div className="rating2 u-margin-bottom-small u-margin-top-small">
            <input type="radio" name="difficulty" value={5} id="5" onClick={this.handleChange} /><label htmlFor="5">☆</label>
            <input type="radio" name="difficulty" value={4} id="4" onClick={this.handleChange} /><label htmlFor="4">☆</label>
            <input type="radio" name="difficulty" value={3} id="3" onClick={this.handleChange} /><label htmlFor="3">☆</label>
            <input type="radio" name="difficulty" value={2} id="2" onClick={this.handleChange} /><label htmlFor="2">☆</label>
            <input type="radio" name="difficulty" value={1} id="1" onClick={this.handleChange} /><label htmlFor="1">☆</label>
          </div>

          <a className="btn-text" onClick={this.click}>TRY MORE &rarr;</a>
        </div>
        <Navbar />
      </div>
    )
  }
}

export default withAuth(PillResult);