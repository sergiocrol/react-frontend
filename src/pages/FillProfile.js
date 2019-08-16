import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import withAuth from '../components/withAuth.js';
import ProfileCard from '../components/ProfileCard';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class FillProfile extends Component {
  state = {
    next: false
  }

  nextPage = () => {
    this.setState({
      next: true
    })
  }

  handleLogout = () => {
    this.props.logout()
      .then(response => {
        return <Redirect to="/" />
      })
  }

  render() {
    const user = this.props.user;
    return (
      <TransitionGroup>
        <div className="container profile-creation">
          <div className="profile-container">
            <div className="profile-creation-textbox">
              <h1>Welcome {user.name}</h1>
              <p>tell us about you :)</p>
              <span className="triangle"></span>
            </div>
            <CSSTransition
              key={this.props.user._id}
              timeout={{ enter: 500, exit: 500 }}
              className={this.state.next ? "fade-exit" : ""}
            >
              <ProfileCard props={this.props} />
            </CSSTransition>
          </div>
          <a className="btn-text" onClick={this.nextPage}>NEXT&rarr;</a>
          <a onClick={this.handleLogout}>Logout</a>
        </div>
      </TransitionGroup>
    )
  }
}

export default withAuth(FillProfile);