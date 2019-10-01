import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PillBox from '../components/PillBox.js';
import UserBox from '../components/UserBox.js';
import withAuth from '../components/withAuth.js';
import User from '../services/user-service.js';
import Navbar from '../components/Navbar.js';
import Header from '../components/Header.jsx';
import auth from '../images/auth.svg';
import created from '../images/created.svg';
import taken from '../images/taken.svg';
import score from '../images/stacs.svg';
import created2 from '../images/created2.svg';
import taken2 from '../images/taken2.svg';
import score2 from '../images/stacs2.svg';
import empty from '../images/empty.svg';
import emptycourse from '../images/emptycourse.svg';
import add from '../images/addpill.svg';

class Dashboard extends Component {
  state = {
    createdVisible: true,
    takenVisible: false,
    scoreVisible: false,
    user: {},
    users: [],
    position: 0
  }

  componentDidMount() {
    this.props.currentUser()
      .then(user => {
        this.setState({
          user: user
        })
      })

    User.getAllUsers()
      .then(users => {
        this.setState({
          users
        }, () => this.position())
      })
  }

  changePanel = (select) => {
    switch (select) {
      case 'created':
        this.setState({
          createdVisible: true,
          takenVisible: false,
          scoreVisible: false
        })
        break;
      case 'taken':
        this.setState({
          createdVisible: false,
          takenVisible: true,
          scoreVisible: false
        })
        break;
      default:
        this.setState({
          createdVisible: false,
          takenVisible: false,
          scoreVisible: true
        })
        break;
    }
  }

  position = () => {
    const { users } = this.state;
    const position = users.map(user => user._id).indexOf(this.props.user._id);

    this.setState({
      position: position + 1
    })
  }

  render() {
    const createdVisible = this.state.createdVisible ? '' : 'u-display-none';
    const takenVisible = this.state.takenVisible ? '' : 'u-display-none';
    const scoreVisible = this.state.scoreVisible ? '' : 'u-display-none';
    const createdColor = this.state.createdVisible ? {} : { color: 'rgba(255, 255, 255, 0.4)' };
    const takenColor = this.state.takenVisible ? {} : { color: 'rgba(255, 255, 255, 0.4)' };
    const scoreColor = this.state.scoreVisible ? {} : { color: 'rgba(255, 255, 255, 0.4)' };
    const createdImage = this.state.createdVisible ? created : created2;
    const takenImage = this.state.takenVisible ? taken : taken2;
    const scoreImage = this.state.scoreVisible ? score : score2;
    const { user, position, users } = this.state;

    return (
      <div>
        <Header />
        <div className="dashboard-container">
          {
            this.props.user.email ? (
              <div className="dashboard-container-body">
                <div className="dashboard-button-container">
                  <a href="#0" onClick={() => { this.changePanel('created') }} style={createdColor}><img src={createdImage} alt="created pill" />your pills</a>
                  <a href="#0" onClick={() => { this.changePanel('taken') }} style={takenColor}><img src={takenImage} alt="taken pill" />taken pills</a>
                  <a href="#0" onClick={() => { this.changePanel('score') }} style={scoreColor}><img src={scoreImage} alt="score" />your score</a>
                  <div className="triangle-dashboard"></div>
                </div>
                <div className="dashboard-content-container">
                  {user.createdPills !== undefined && Object.keys(user.createdPills).length > 0 ? (
                    <section className={`pills-container ${createdVisible}`}>
                      <Link className="new-pill-float-button" to='/pills/new'>+</Link>
                      {user.createdPills.map((el, i) => {
                        return <PillBox key={i} user={el} />
                      })}
                    </section>
                  ) : (
                      <section className={`dashboard-content-container-created ${createdVisible}`}>
                        <h2 className="u-margin-bottom-medium">empty</h2>
                        <img src={empty} alt="no data" />
                        <Link to="/pills/new" className="u-margin-top-big" ><img src={add} alt="created pill" /> new pill</Link>
                      </section>
                    )}
                  {user.takenPills !== undefined && Object.keys(user.takenPills).length > 0 ? (
                    <section className={`pills-container ${takenVisible}`}>
                      <Link className="new-pill-float-button" to='/pills/new'>+</Link>
                      {user.takenPills.map((el, i) => {
                        return <PillBox key={i} user={el.pill} />
                      })}
                    </section>
                  ) : (
                      <section className={`dashboard-content-container-taken ${takenVisible}`}>
                        <h2 className="u-margin-top-small">empty</h2>
                        <img src={emptycourse} alt="no data" className="u-margin-top-big u-margin-bottom-big" />
                        <Link to="/home" className="u-margin-top-big" ><img src={add} alt="created pill" /> explore</Link>
                      </section>
                    )}
                  <section className={`dashboard-content-container-score ${scoreVisible}`}>
                    <header className="u-margin-top-small">
                      <h2>Your score is</h2>
                      <div>{user.score}</div>
                      <h3>you are in position <span>#{position}</span></h3>
                    </header>
                    <section>
                      {
                        users.length === 0 ? <h3>Loading...</h3> : (
                          users.map((user, i) => {
                            return <UserBox key={user._id} user={user} position={i + 1} />
                          })
                        )
                      }
                    </section>
                  </section>
                  }
                </div>
              </div>
            ) : (
                <div className="not-logged-message">
                  <img src={auth} alt="login logo" />
                  <div className="profile-creation-textbox">
                    <p className="profile-creation-textbox-text">Please, login to get access to your dashboard</p>
                    <span className="triangle"></span>
                  </div>
                  <Link to="/login" className="btn-text"> LOGIN&rarr;</Link>
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
