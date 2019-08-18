import React, { Component } from 'react';
import pillService from '../services/pill-service.js';
import Navbar from '../components/Navbar.js';
import Header from '../components/Header.jsx';

class PillCreate extends Component {
  state = {
    pill: {}
  }

  componentDidMount() {
    pillService.getPill(this.props.match.params.id)
      .then(pill => {
        this.setState({
          pill: pill
        })
        console.log(pill);
      })
  }

  render() {
    const { name, fromLanguage, toLanguage } = this.state.pill;
    return (
      <div>
        <Header />
        <div className="dashboard-container u-padding-top-big">
          <h1>{name} - [{fromLanguage} to {toLanguage}]</h1>
        </div>
        <Navbar />
      </div>
    )
  }
}

export default PillCreate;