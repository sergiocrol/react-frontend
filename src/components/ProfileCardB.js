import React, { Component } from 'react'
const lang = require('../helpers/languages');

class ProfileCardB extends Component {

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
    langArray: this.langArray('speak'),
    langAdded: [],
    langLevel: [],
    langLearnArray: this.langArray('learn'),
    langLearnAdded: [],
    langLearnLevel: [],
    nativeLanguage: [],
    search: '',
    level: 'native'
  }

  async componentDidMount() {
    let { nativeLanguage, spokenLanguages, learningLanguages } = await this.props.userInfo();
    const newLangLevel = [...spokenLanguages];
    const newLearnLevel = [...learningLanguages]
    this.setState({
      langLevel: newLangLevel,
      langLearnLevel: newLearnLevel
    })
    learningLanguages.forEach(lang => {
      this.addLanguage(lang.lang, 'learn', lang.level)
    })
    nativeLanguage.forEach(lang => {
      if (lang != null) {
        this.addLanguage(lang, 'speak', 'native')
      }
    })
    spokenLanguages.forEach(lang => {
      this.addLanguage(lang.lang, 'sepak', lang.level)
    })
  }


  addLanguage = (lang, text, level) => {
    if (text === 'speak') {
      const arrLang = [...this.state.langAdded];
      arrLang.push(<p className="language-selected" key={lang}>
        <a className="delete-button" href="#0" onClick={() => { this.removeLanguage(lang, text) }}>x</a>
        <label className="language-label">{lang}</label>
        <select
          className="selector-language"
          name="level"
          value={level}
          onChange={(e) => { this.handleSelectSpeak(e); this.changeLevel(lang, text, e) }}>
          <option value="native">native</option>
          <option value="elementary">elementary</option>
          <option value="intermediate">intermediate</option>
          <option value="advanced">advanced</option>
        </select>
      </p>);
      const arrLevel = [...this.state.langLevel];
      arrLevel.push({ language: lang, level: level || 'native' });
      console.log(arrLevel);
      this.props.info("langLevel", arrLevel);

      this.setState({
        langAdded: arrLang,
        langLevel: arrLevel
      })
    } else {
      const arrLang = [...this.state.langLearnAdded];
      arrLang.push(<p className="language-selected" key={lang}> <a className="delete-button" href="#0" onClick={() => { this.removeLanguage(lang, text) }}>x</a> {lang} <select className="selector-language" name="level" value={level} onChange={(e) => { this.handleChange(e, text); this.changeLevel(lang, text, e) }}><option value="native">native</option><option value="elementary">elementary</option><option value="intermediate">intermediate</option><option value="advanced">advanced</option></select> </p>);
      const arrLevel = [...this.state.langLearnLevel];
      arrLevel.push({ language: lang, level: (level || 'native') });
      this.props.info("langLearnLevel", arrLevel);

      this.setState({
        langLearnAdded: arrLang,
        langLearnLevel: arrLevel
      })
    }
  }

  removeLanguage = (lang, text) => {
    if (text === 'speak') {
      const arrLang = [...this.state.langAdded];
      const keys = arrLang.map(el => el.key);
      arrLang.splice(keys.indexOf(lang), 1);
      const arrLevel = [...this.state.langLevel];
      arrLevel.splice(keys.indexOf(lang), 1);
      console.log(arrLevel);
      this.props.info("langLevel", arrLevel);

      this.setState({
        langAdded: arrLang,
        langLevel: arrLevel
      })
    } else {
      const arrLang = [...this.state.langLearnAdded];
      const keys = arrLang.map(el => el.key);
      arrLang.splice(keys.indexOf(lang), 1);
      const arrLevel = [...this.state.langLearnLevel];
      arrLevel.splice(keys.indexOf(lang), 1);
      this.props.info("langLearnLevel", arrLevel);

      this.setState({
        langLearnAdded: arrLang,
        langLearnLevel: arrLevel
      })
    }
  }

  changeLevel = (lang, text, e) => {
    if (text === 'speak') {
      const arrLang = [...this.state.langAdded];
      const keys = arrLang.map(el => el.key);

      const arrLevel = [...this.state.langLevel];
      arrLevel[keys.indexOf(lang)].level = this.state.level;
      this.props.info("langLevel", arrLevel);

      this.setState({
        langAdded: arrLang,
        langLevel: arrLevel
      })
    } else {
      const arrLang = [...this.state.langLearnAdded];
      const keys = arrLang.map(el => el.key);

      const arrLevel = [...this.state.langLearnLevel];
      arrLevel[keys.indexOf(lang)].level = this.state.level;
      this.props.info("langLearnLevel", arrLevel);

      this.setState({
        langLearnAdded: arrLang,
        langLearnLevel: arrLevel
      })
    }
  }


  handleChange = (event, text) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.props.info(name, value);

    if (text === 'speak') {
      const newArray = this.langArray('speak').filter(name => { return name.props.children.toLowerCase().includes(this.state.search.trim().toLowerCase()) ? name : null })
      this.setState({ langArray: newArray });
    } else {
      const newArray = this.langArray('learn').filter(name => { return name.props.children.toLowerCase().includes(this.state.search.trim().toLowerCase()) ? name : null })
      this.setState({ langLearnArray: newArray });
    }
  }

  handleSelectSpeak = event => {
    const { value } = event.target;
    this.setState({
      level: value
    })
  }

  render() {
    return (
      <form className="form" autoComplete="off">
        <h3 className="language-box-title">write about you want to learn</h3>
        <textarea className="textarea" rows="2"></textarea>
        <h3 className="language-box-title">Languages you speak</h3>
        <div className="language-box">
          <div className="language-box-select">
            <input id="speak" className="mainLoginInput" type="text" name="search" value={this.state.text} placeholder="&#61442; language" onChange={(e) => { this.handleChange(e, 'speak') }} />
            <div>
              {
                this.state.langArray
              }
            </div>
          </div>
          <div className="language-box-counter">
            {
              this.state.langAdded.length > 0 ? this.state.langAdded : <p className="empty-message">add languages</p>
            }
          </div>
        </div>
        <h3 className="language-box-title">Languages you learn</h3>
        <div className="language-box">
          <div className="language-box-select">
            <input id="learn" className="mainLoginInput" type="text" name="search" value={this.state.text} placeholder="&#61442; language" onChange={(e) => { this.handleChange(e, 'learn') }} />
            <div>
              {
                this.state.langLearnArray
              }
            </div>
          </div>
          <div className="language-box-counter">
            {
              this.state.langLearnAdded.length > 0 ? this.state.langLearnAdded : <p className="empty-message">add languages</p>
            }
          </div>
        </div>
      </form>
    )
  }
}

export default ProfileCardB;