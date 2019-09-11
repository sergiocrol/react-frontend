import React, { Component } from 'react'
const lang = require('../helpers/languages');

class ProfileCardLang extends Component {

  langArray = (box) => {
    const langArray = [];
    for (const language in lang) {
      const code639 = lang[language]['639-1'];
      const native = lang[language].nativeName;
      box === 'speak' ? (
        langArray.push(<p key={code639} onClick={() => { this.addLanguage(native, 'speak') }}>{native}</p>)
      ) : (
          langArray.push(<p key={code639} onClick={() => { this.addLanguage(native, 'learn') }}>{native}</p>)
        )
    }
    return langArray;
  }

  state = {
    langSpeakList: this.langArray('speak'),
    langLearnList: this.langArray('learn'),
    spokenLanguages: [],
    learningLanguages: [],
    searchSpeak: '',
    searchLearn: '',
    description: ''
  }

  async componentDidMount() {
    let { spokenLanguages, learningLanguages, description } = await this.props.userInfo();
    this.setState({
      spokenLanguages,
      learningLanguages,
      description
    })
  }

  addLanguage = (language, langBox) => {
    const { spokenLanguages, learningLanguages } = this.state;
    if (langBox === 'speak') {
      const newSpokenLanguages = [...spokenLanguages];
      if (!newSpokenLanguages.map(lang => lang.lang).includes(language)) {
        newSpokenLanguages.push({ lang: language, rate: 'intermediate' });
        this.setState({
          spokenLanguages: newSpokenLanguages
        })
        this.props.info("spokenLanguages", newSpokenLanguages);
      }
    } else {
      const newLearningLanguages = [...learningLanguages];
      if (!newLearningLanguages.map(lang => lang.lang).includes(language)) {
        newLearningLanguages.push({ lang: language, rate: 'intermediate' });
        this.setState({
          learningLanguages: newLearningLanguages
        })
        this.props.info("learningLanguages", newLearningLanguages);
      }
    }
  }

  removeLanguage = (language, langBox) => {
    const { spokenLanguages, learningLanguages } = this.state;
    if (langBox === 'speak') {
      let newSpokenLanguages = [...spokenLanguages];
      newSpokenLanguages = newSpokenLanguages.filter(lang => language !== lang.lang);
      this.setState({
        spokenLanguages: newSpokenLanguages
      })
      this.props.info("spokenLanguages", newSpokenLanguages);
    } else {
      let newLearningLanguages = [...learningLanguages];
      newLearningLanguages = newLearningLanguages.filter(lang => language !== lang.lang);
      this.setState({
        learningLanguages: newLearningLanguages
      })
      this.props.info("learningLanguages", newLearningLanguages);
    }
  }

  languageLine = (language, langBox) => {
    return (
      <p className="language-selected" key={language.lang}>
        <a className="delete-button" href="#0" onClick={() => { this.removeLanguage(language.lang, langBox) }}>x</a>
        <label className="language-label">{language.lang}</label>
        <select
          className="selector-language"
          name="level"
          value={language.rate}
          onChange={e => { this.changeLevel(e, language.lang, langBox) }}>
          <option value="native">native</option>
          <option value="elementary">elementary</option>
          <option value="intermediate">intermediate</option>
          <option value="advanced">advanced</option>
        </select>
      </p>
    )
  }

  changeLevel = (event, language, langBox) => {
    const { spokenLanguages, learningLanguages } = this.state;
    if (langBox === 'speak') {
      let newSpokenLanguages = [...spokenLanguages];
      newSpokenLanguages = newSpokenLanguages.map(lang => language === lang.lang ? { lang: lang.lang, rate: event.target.value } : lang);
      this.setState({
        spokenLanguages: newSpokenLanguages
      })
      this.props.info("spokenLanguages", newSpokenLanguages);
    } else {
      let newLearningLanguages = [...learningLanguages];
      newLearningLanguages = newLearningLanguages.map(lang => language === lang.lang ? { lang: lang.lang, rate: event.target.value } : lang);
      this.setState({
        learningLanguages: newLearningLanguages
      })
      this.props.info("learningLanguages", newLearningLanguages);
    }
  }


  handleChange = (event, text) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.props.info(name, value);

    if (text === 'speak') {
      const newArray = this.langArray('speak').filter(name => { return name.props.children.toLowerCase().includes(this.state.searchSpeak.trim().toLowerCase()) ? name : null })
      this.setState({ langSpeakList: newArray });
    } else {
      const newArray = this.langArray('learn').filter(name => { return name.props.children.toLowerCase().includes(this.state.searchLearn.trim().toLowerCase()) ? name : null })
      this.setState({ langLearnList: newArray });
    }
  }

  render() {
    return (
      <form className="form" autoComplete="off">
        <h3 className="language-box-title">write about you want to learn</h3>
        <input type="text" className="textarea" name="description" rows="2" value={this.state.description || ''} onChange={this.handleChange} />
        <h3 className="language-box-title">Languages you speak</h3>
        <div className="language-box">
          <div className="language-box-select">
            <input id="speak" className="mainLoginInput" type="text" name="searchSpeak" value={this.state.searchSpeak} placeholder="&#61442; language" onChange={(e) => { this.handleChange(e, 'speak') }} />
            <div>
              {
                this.state.langSpeakList
              }
            </div>
          </div>
          <div className="language-box-counter">
            {
              this.state.spokenLanguages.length > 0 ? this.state.spokenLanguages.map(lang => this.languageLine(lang, 'speak')) : <p className="empty-message">add languages</p>
            }
          </div>
        </div>
        <h3 className="language-box-title">Languages you learn</h3>
        <div className="language-box">
          <div className="language-box-select">
            <input id="learn" className="mainLoginInput" type="text" name="searchLearn" value={this.state.searchLearn} placeholder="&#61442; language" onChange={(e) => { this.handleChange(e, 'learn') }} />
            <div>
              {
                this.state.langLearnList
              }
            </div>
          </div>
          <div className="language-box-counter">
            {
              this.state.learningLanguages.length > 0 ? this.state.learningLanguages.map(lang => this.languageLine(lang, 'learn')) : <p className="empty-message">add languages</p>
            }
          </div>
        </div>
      </form>
    )
  }
}

export default ProfileCardLang;