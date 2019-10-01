import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../components/withAuth.js';
import pillService from '../services/pill-service.js';
import Navbar from '../components/Navbar.js';
import Header from '../components/Header.jsx';
import empty from '../images/empty.svg';
import PillBox from '../components/PillBox.js';
const lang = require('../helpers/languages');

class Home extends Component {
  state = {
    fromLanguage: "English",
    toLanguage: "Español",
    difficulty: 1,
    topic: '',
    displayNone: false,
    pills: [],
    suggestedPills: []
  }

  componentDidMount() {
    pillService.getPillsByRate()
      .then(pills => {
        this.setState({
          suggestedPills: pills
        })
      })
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

  search = () => {
    this.setState({
      displayNone: true
    })
    const { difficulty, fromLanguage, toLanguage, topic } = this.state;
    pillService.getPillsByLevel(difficulty, fromLanguage, toLanguage, topic)
      .then(pill => {
        this.setState({
          pills: pill
        })
      })
  }

  render() {
    const { fromLanguage, toLanguage, difficulty, topic, pills, suggestedPills, _id } = this.state;
    const displayNone = this.state.displayNone ? 'u-display-none' : '';
    return (
      <div className="home-page">
        <Header />
        <div className="home-search-container">
          <div className="home-search-container-box">
            <form onSubmit={this.searchQuery}>
              <select className="selector search-box-selector" name="fromLanguage" id="fromLanguage" value={fromLanguage} onChange={this.handleChange}>
                {
                  this.langArray().map((lang, i) => { return <option key={i}>{lang}</option> })
                }
              </select>
              <span>&#8651;</span>
              <select className="selector search-box-selector" name="toLanguage" id="toLanguage" value={toLanguage} onChange={this.handleChange}>
                {
                  this.langArray().map((lang, i) => { return <option key={i}>{lang}</option> })
                }
              </select>
              <span className="separator">|</span>
              <select className="selector search-box-selector level" name="difficulty" id="difficulty" value={difficulty} onChange={this.handleChange}>
                <option disabled="disabled">--level--</option>
                <option name="difficulty" value={1}> ●○○○○</option>
                <option name="difficulty" value={2}> ●●○○○</option>
                <option name="difficulty" value={3}> ●●●○○</option>
                <option name="difficulty" value={4}> ●●●●○</option>
                <option name="difficulty" value={5}> ●●●●●</option>
              </select>
              <input type="text" name="topic" value={topic} onChange={this.handleChange} placeholder="search by topic (e.g. Phrasal verbs)" />
              <a href="#0" className="search-box-button" onClick={this.search}> search </a>
            </form>
          </div>
          <div className="triangle"></div>
        </div>
        <div className="search-body">
          <div className="search-body-result">
            <div className="search-body-suggestions-container">
              {
                pills.length === 0 ? (
                  <div className="no-results u-padding-bottom-big">
                    <p className="u-margin-bottom-medium">No results</p>
                    <img src={empty} alt="no results" />
                  </div>
                ) : (
                    <div className="results">
                      {pills.map((el, i) => {
                        return <Link key={i} style={{ textDecoration: 'none' }} to={`/pills/${el._id}`}><PillBox user={el} /></Link>
                      })}
                    </div>
                  )
              }
            </div>
          </div>
          <div className={`search-body-suggestions ${displayNone}`}>
            <div className="search-body-suggestions-container">
              <div className="results">
                <p className="result-title">recomended</p>
                {suggestedPills.map((el, i) => {
                  return <Link key={i} style={{ textDecoration: 'none' }} to={el.author === this.props.user._id ? '/dashboard' : `/pills/${el._id}`}><PillBox user={el} /></Link>
                })}
              </div>
            </div>
          </div>
        </div>
        <Navbar />
      </div >
    )
  }
}

export default withAuth(Home);