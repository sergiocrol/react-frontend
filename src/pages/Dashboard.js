import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../components/withAuth.js';
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
import emptyscore from '../images/emptyscore.svg';
import add from '../images/addpill.svg';

class Dashboard extends Component {
  state = {
    createdVisible: true,
    takenVisible: false,
    scoreVisible: false
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

  render() {
    const createdVisible = this.state.createdVisible ? 'dashboard-content-container-created' : 'dashboard-content-container-created u-display-none';
    const takenVisible = this.state.takenVisible ? 'dashboard-content-container-taken' : 'dashboard-content-container-taken u-display-none';
    const scoreVisible = this.state.scoreVisible ? 'dashboard-content-container-score' : 'dashboard-content-container-score u-display-none';
    const createdColor = this.state.createdVisible ? {} : { color: 'rgba(255, 255, 255, 0.4)' };
    const takenColor = this.state.takenVisible ? {} : { color: 'rgba(255, 255, 255, 0.4)' };
    const scoreColor = this.state.scoreVisible ? {} : { color: 'rgba(255, 255, 255, 0.4)' };
    const createdImage = this.state.createdVisible ? created : created2;
    const takenImage = this.state.takenVisible ? taken : taken2;
    const scoreImage = this.state.scoreVisible ? score : score2;

    console.log("created " + createdVisible, "taken " + takenVisible, "score " + scoreVisible);
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
                  <section className={createdVisible}>
                    <h2 className="u-margin-bottom-medium">empty</h2>
                    <img src={empty} alt="no data"/>
                    <a href="#0" className="u-margin-top-big" ><img src={add} alt="created pill" /> new pill</a>
                  </section>
                  <section className={takenVisible}>
                  <h2 className="u-margin-top-big">empty</h2>
                    <img src={emptycourse} alt="no data" className="u-margin-top-big u-margin-bottom-big"/>
                    <a href="#0" className="u-margin-top-big" ><img src={add} alt="created pill" /> explore</a>
                  </section>
                  <section className={scoreVisible}>
                  <h2 className="u-margin-top-big">empty</h2>
                    <img src={emptyscore} alt="no data" className="u-margin-top-big u-margin-bottom-big"/>
                    <a href="#0" className="u-margin-top-big" ><img src={add} alt="created pill" /> explore</a>
                  </section>
                </div>
                {/* <h3>Dashboard</h3>
                <Link to={{ pathname: "/pills/new", props: this.props }}>+ new pill</Link> */}
              </div>
            ) : (
                <div className="not-logged-message">
                  <img src={auth} alt="login logo" />
                  <div className="profile-creation-textbox">
                    <p className="profile-creation-textbox-text">Please, login to get access to your dashboard</p>
                    <span className="triangle"></span>
                  </div>
                  <Link to=""> <a href="#0" className="btn-text" >LOGIN&rarr;</a> </Link>
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
