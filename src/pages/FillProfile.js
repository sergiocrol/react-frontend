import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import withAuth from '../components/withAuth.js';
import ProfileCard from '../components/ProfileCard';
import ProfileCardB from '../components/ProfileCardB';
import logout from '../images/logout.svg';
import { Transition, animated } from 'react-spring/renderprops'


class FillProfile extends Component {
  pages = [
    style => (
      <animated.div style={{ ...style }}><ProfileCard props={this.props} info={this.updateUserInfo} /></animated.div>
    ),
    style => (
      <animated.div style={{ ...style }}><ProfileCardB props={this.props} info={this.updateUserInfo} /></animated.div>
    )
  ]

  state = {
    next: false,
    index: 0,
    profileImage: this.props.user.profileImage,
    name: this.props.user.name,
    location: '',
    age: '',
    gender: '',
    langLearnLevel: [],
    langLevel: [],
    filled: false
  }

  componentDidMount() {
    this.props.currentUser()
      .then(user => {
        console.log(user)
        this.setState({
          profileImage: user.profileImage,
          name: user.name
        })
      })
  }

  updateUserInfo = (key, value) => {
    this.setState({
      [key]: value
    })

  }

  toggle = e => {
    this.setState(state => ({
      index: state.index === 1 ? 0 : state.index + 1,
    }))
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

  save = () => {
    let { name, profileImage, location, age, gender, langLearnLevel, langLevel } = this.state;
    age = new Date(age);
    let nativeLanguage = [];
    let spokenLanguages = [];
    let learningLanguages = [];
    langLevel.forEach(lang => { lang.level === 'native' ? nativeLanguage.push(lang.language) : spokenLanguages.push({ lang: lang.language, rate: lang.level }) });
    langLearnLevel.forEach(lang => { learningLanguages.push({ lang: lang.language, rate: lang.level }) });

    const user = { name, profileImage, location, age, gender, nativeLanguage, spokenLanguages, learningLanguages };

    this.props.updateUser(user)
      .then(() => {
        this.setState({
          filled: true
        })

      })
  }

  render() {
    if (this.state.filled) { return <Redirect to="/home" /> };
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

        </div>
        <a href="#0" className="btn-text" onClick={this.state.index === 1 ? this.save : this.toggle}>{this.state.index === 1 ? 'FINISH' : 'NEXT'}&rarr;</a>
        {this.state.index === 1 ? null : <a className="logout-button" href="#0" onClick={this.handleLogout}><img src={logout} alt="logout" /></a>}
      </div>
    )
  }
}

export default withAuth(FillProfile);