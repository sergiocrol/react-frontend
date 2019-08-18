import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import withAuth from '../components/withAuth.js';
import Navbar from '../components/Navbar.js';
import Header from '../components/Header.jsx';
import pillService from '../services/pill-service.js';
const lang = require('../helpers/languages');

class PillNew extends Component {
  state = {
    fromLanguage: "English",
    toLanguage: "Español",
    name: "",
    description: "",
    difficulty: 1,
    topic: "",
    topicsArray: [],
    topics: [],
    redirect: false,
    pill: {}
  }

  langArray = () => {
    const langArray = [];
    for (const language in lang) {
      const native = lang[language].nativeName;
      langArray.push(native)
    }
    return langArray;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  addTopic = (event) => {
    if (event.keyCode === 13) {
      const newTopic = <button key={event.target.value} onClick={this.deleteTopic}>{event.target.value}</button>;
      const newTopicsArray = [...this.state.topicsArray];
      const newTopics = [...this.state.topics];
      newTopics.push(event.target.value);
      newTopicsArray.push(newTopic);
      this.setState({
        topicsArray: newTopicsArray,
        topics: newTopics,
        topic: ""
      })
    }
  }

  deleteTopic = event => {
    const index = this.state.topics.indexOf(event.target.innerHTML);
    const newTopicsArray = [...this.state.topicsArray];
    const newTopics = [...this.state.topics];
    newTopicsArray.splice(index, 1);
    newTopics.splice(index, 1);
    this.setState({
      topicsArray: newTopicsArray,
      topics: newTopics
    })
  }

  savePill = () => {
    let { name, fromLanguage, toLanguage, difficulty, description, topics } = this.state;
    difficulty = +difficulty;
    const date = new Date();
    const author = this.props.user._id;
    const pill = { name, fromLanguage, toLanguage, author, date, difficulty, description, topics };
    pillService.newPill(pill)
      .then(pill => {
        console.log(pill);
        this.setState({
          redirect: true,
          pill: pill
        })
      })
  }

  render() {
    const { name, fromLanguage, toLanguage, description, topic, topicsArray, pill } = this.state;
    if (this.state.redirect) { return <Redirect to={`/pills/${pill._id}/create`} /> }
    return (
      <div>
        <Header />
        <div className="dashboard-container u-padding-top-big">
          <div className="profile-creation-textbox">
            <p className="profile-creation-textbox-text u-center-text">Let's create a new Pill! :D</p>
            <p className="profile-creation-textbox-text u-center-text">Tell to the student what is going to learn</p>
            <span className="triangle"></span>
          </div>
          <p>from</p>
          <select name="fromLanguage" id="fromLanguage" value={fromLanguage} onChange={this.handleChange}>
            {
              this.langArray().map((lang, i) => { return <option key={i}>{lang}</option> })
            }
          </select>
          <p>To</p>
          <select name="toLanguage" id="toLanguage" value={toLanguage} onChange={this.handleChange}>
            {
              this.langArray().map((lang, i) => { return <option key={i}>{lang}</option> })
            }
          </select>
          <p>name</p>
          <input type="text" name="name" value={name} onChange={this.handleChange} placeholder="Pill's name" />
          <p>description</p>
          <textarea className="textarea" rows="6" name="description" value={description} onChange={this.handleChange}></textarea>
          <p>level</p>
          <div className="rating">
            <input type="radio" name="difficulty" value={5} id="5" onChange={this.handleChange} /><label htmlFor="5">◯</label>
            <input type="radio" name="difficulty" value={4} id="4" onChange={this.handleChange} /><label htmlFor="4">◯</label>
            <input type="radio" name="difficulty" value={3} id="3" onClick={this.handleChange} /><label htmlFor="3">◯</label>
            <input type="radio" name="difficulty" value={2} id="2" onClick={this.handleChange} /><label htmlFor="2">◯</label>
            <input type="radio" name="difficulty" value={1} id="1" onClick={this.handleChange} /><label htmlFor="1">◯</label>
          </div>
          <p>You are going to teach:</p>
          <input type="text" name="topic" value={topic} onChange={this.handleChange} onKeyDown={this.addTopic} placeholder="write a topic: colors, phrasal verbs..." />
          <div>
            {
              topicsArray
            }
          </div>
          <a href="#0" className="btn-text" onClick={this.savePill}>START&rarr;</a>
        </div>
        <Navbar />
      </div>
    )
  }
}

export default withAuth(PillNew);