import React, { Component } from 'react'

class ImageEasy extends Component {
  render() {
    return (
      <div>
        <h2 className="card-title">
          <a href="#0" className="button-back-card" onClick={this.props.flip}>&#60;</a>
          NAME THE IMAGES
        </h2>
        <div className="images-card-container">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <a href="#0" className="button-next-card" onClick={this.props.flip}>NEXT CARD</a>
      </div>
    )
  }
}

export default ImageEasy;
