import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import withAuth from '../components/withAuth.js';
import Navbar from '../components/Navbar.js';
import Header from '../components/Header.jsx';
import pillService from '../services/pill-service.js';

class PillPage extends Component {
  state = {
    pill: {},
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

  level = () => {
    const level = this.state.pill.difficulty;
    const res = [];
    for (let i = 1; i <= 5; i++) {
      i <= level ? res.push(<label key={i} htmlFor="5">•</label>) : res.push(<label key={i} htmlFor="5">◦</label>);
    }
    return res;
  }

  render() {
    const { name, fromLanguage, toLanguage, description, topics, _id } = this.state.pill;
    let topicArray = [];
    if (topics !== undefined) {
      topicArray = topics.map((el, i) => { return <p key={i} className="topic-button">{el}</p> })
    }
    let author = this.state.pill.author;
    if (author !== undefined) {
      author = author.name
    }

    return (
      <div className="container-pill u-padding-top-big">
        <Header />
        <div className="container-content">
          <h1>{name}</h1>
          <p className="container-content-language u-margin-top-small"><span>{fromLanguage}</span> &#8651; <span>{toLanguage}</span></p>
          <div className="container-content-description u-margin-top-medium">{description}</div>
          <div> <span>author: {author} </span></div>
          <p className="level-bullet"><span>level<div className="triangle-right"></div></span>{this.level()}</p>
          <p className="topic-title">You are going to learn: </p>
          <div className="u-margin-bottom-medium">{topicArray}</div>
          <Link to={`/pills/${_id}/play`} className="btn-text">START &rarr;</Link>
        </div>
        <Navbar />
      </div>
    )
  }
}

export default withAuth(PillPage);