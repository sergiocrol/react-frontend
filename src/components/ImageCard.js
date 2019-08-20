import React, { Component } from 'react';

class ImageCard extends Component {

  state = {
    answerOne: "",
    answertwo: "",
    answerThree: "",
    answerFour: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  isComplete = () => {
    return (
      this.state.answerOne !== '' &&
      this.state.answerTwo !== '' &&
      this.state.answerThree !== '' &&
      this.state.answerFour !== '') ? true : false;
  }

  render() {
    const { answerOne, answerTwo, answerThree, answerFour } = this.state;
    const images = this.props.content;
    const complete = this.isComplete() ? "button-next-card" : "button-next-card u-is-disabled";
    const response = { type: 'imageEasy', answers: [answerOne, answerTwo, answerThree, answerFour], content: images };
    return (
      <div>
        <h2 className="card-title play">
          NAME THE IMAGES
        </h2>
        <div className="images-card-container">
          <div>
            <div className="images-card-image-container"> <img src={images[0].imageUrl} alt="one" /> </div>
            <input name="answerOne" value={answerOne || ''} type="text" className="images-card-answer-input" onChange={this.handleChange} placeholder="ANSWER" autoComplete="off"/>
          </div>
          <div>
            <div className="images-card-image-container"> <img src={images[1].imageUrl} alt="two" /> </div>
            <input name="answerTwo" value={answerTwo || ''} type="text" className="images-card-answer-input" onChange={this.handleChange} placeholder="ANSWER" autoComplete="off"/>
          </div>
          <div>
            <div className="images-card-image-container"> <img src={images[2].imageUrl} alt="three" /> </div>
            <input name="answerThree" value={answerThree || ''} type="text" className="images-card-answer-input" onChange={this.handleChange} placeholder="ANSWER" autoComplete="off"/>
          </div>
          <div>
            <div className="images-card-image-container"> <img src={images[3].imageUrl} alt="four" /> </div>
            <input name="answerFour" value={answerFour || ''} type="text" className="images-card-answer-input" onChange={this.handleChange} placeholder="ANSWER" autoComplete="off"/>
          </div>
        </div>
        <a href="#0" className={complete} onClick={() => { this.props.flip(response) }}>SOLUTION</a>
      </div>
    )
  }
}

export default ImageCard;