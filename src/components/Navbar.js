import React, { Component } from 'react';

class Navbar extends Component {
  state = {
    lang: 'en'
  }

  handleChange = (el) => {
    this.setState({
      lang: el.target.innerHTML
    })
    this.props.language(el.target.innerHTML)
  }

  render() {
    return (
      <nav>
        <p>logo</p>
        <ul>
          <li><a href="#0" onClick={this.handleChange} value="en">en</a></li>
          <li><a href="#0" onClick={this.handleChange} value="sp">sp</a></li>
        </ul>
      </nav>
    )
  }
}

export default Navbar;