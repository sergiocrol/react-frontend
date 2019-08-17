import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import withAuth from '../components/withAuth.js';
import ProfileCard from '../components/ProfileCard';
import { Transition, animated } from 'react-spring/renderprops'


class FillProfile extends Component {
  pages = [
    style => (
      <animated.div style={{ ...style }}><ProfileCard props={this.props} info={this.updateUserInfo} /></animated.div>
    ),
    style => (
      <animated.div style={{ ...style }}><ProfileCard props={this.props} info={this.updateUserInfo} /></animated.div>
    ),
    style => (
      <animated.div style={{ ...style }}><ProfileCard props={this.props} info={this.updateUserInfo} /></animated.div>
    ),
  ]

  state = {
    next: false,
    index: 0,
    profileImage: '',
    name: '',
    location: '',
    age: '',
    gender: ''
  }

  updateUserInfo = (key, value) => {
    this.setState({
      [key]: value
    })
    console.log(this.state)
  }

  toggle = e =>
    this.setState(state => ({
      index: state.index === 2 ? 0 : state.index + 1,
    }))

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
      <div className="container profile-creation">
        <div className="profile-container">
          <div className="profile-creation-textbox">
            <h1>Welcome {user.name}</h1>
            <p>tell us about you :)</p>
            <span className="triangle"></span>
          </div>

          <Transition
            native
            reset
            unique
            config={{ duration: 2000 }}
            items={this.state.index}
            initial={{ opacity: 1, transform: 'translate3d(0%,0,0)' }}
            from={{ opacity: 0, transform: 'translate3d(0%,0,0)' }}
            enter={{ opacity: 1, transform: 'translate3d(0%,0,0)' }}
            leave={{ opacity: 0, display: 'none', transform: 'translate3d(-50%,0,0)' }}>
            {index => this.pages[index]}
          </Transition>
          {/* <ProfileCard props={this.props} /> */}
          {/* <ProfileCard props={this.props} /> */}

        </div>
        <a href="#0" className="btn-text" onClick={this.toggle}>NEXT&rarr;</a>
        <a href="#0" onClick={this.handleLogout}>Logout</a>
      </div>
    )
  }
}

export default withAuth(FillProfile);