import React, { Component } from 'react';

class ImageCardSolution extends Component {

  state = {
    answerOne: "",
    answertwo: "",
    answerThree: "",
    answerFour: "",
    score: 0
  };

  componentDidMount() {
    let score = 0;
    this.setState({
      answerOne: this.props.answers[0].toLowerCase(),
      answerTwo: this.props.answers[1].toLowerCase(),
      answerThree: this.props.answers[2].toLowerCase(),
      answerFour: this.props.answers[3].toLowerCase(),
    })
    if (this.props.answers[0].toLowerCase() === this.props.content[0].answer[0]) { score += 10 }
    if (this.props.answers[1].toLowerCase() === this.props.content[1].answer[0]) { score += 10 }
    if (this.props.answers[2].toLowerCase() === this.props.content[2].answer[0]) { score += 10 }
    if (this.props.answers[3].toLowerCase() === this.props.content[3].answer[0]) { score += 10 }
    this.setState({
      score: score
    })
  }

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

  nextCard = () => {
    this.props.score(this.state.score);
    this.props.flip();
    this.props.toggle();
  }

  render() {
    const { answerOne, answerTwo, answerThree, answerFour } = this.state;
    const images = this.props.content;
    const correctOne = images[0].answer[0];
    const correctTwo = images[1].answer[0];
    const correctThree = images[2].answer[0];
    const correctFour = images[3].answer[0];
    const classOne = answerOne === correctOne ? 'label-green' : 'label-red';
    const classTwo = answerTwo === correctTwo ? 'label-green' : 'label-red';
    const classThree = answerThree === correctThree ? 'label-green' : 'label-red';
    const classFour = answerFour === correctFour ? 'label-green' : 'label-red';
    const text = this.props.index === this.props.last - 1 ? 'FINISH' : 'NEXT';
    const func = this.props.index === this.props.last - 1 ? this.props.finish : this.nextCard;

    return (
      <div style={{ height: '100%' }}>
        <h2 className="card-title play">
          NAME THE IMAGES
          <p className="score">{this.state.score}pts</p>
        </h2>
        <div className="images-card-container">
          <div>
            <div className="images-card-image-container"> <img src={images[0].imageUrl} alt="one" /> </div>
            {answerOne === correctOne ? null : <label className="correct-answer">{correctOne.toUpperCase()}</label>}
            <label className={`images-card-answer-label ${classOne}`}>{answerOne}</label>
          </div>
          <div>
            <div className="images-card-image-container"> <img src={images[1].imageUrl} alt="two" /> </div>
            {answerTwo === correctTwo ? null : <label className="correct-answer">{correctTwo.toUpperCase()}</label>}
            <label className={`images-card-answer-label ${classTwo}`}>{answerTwo} </label>
          </div>
          <div>
            <div className="images-card-image-container"> <img src={images[2].imageUrl} alt="three" /> </div>
            {answerThree === correctThree ? null : <label className="correct-answer">{correctThree.toUpperCase()}</label>}
            <label className={`images-card-answer-label ${classThree}`}> {answerThree} </label>
          </div>
          <div>
            <div className="images-card-image-container"> <img src={images[3].imageUrl} alt="four" /> </div>
            {answerFour === correctFour ? null : <label className="correct-answer">{correctFour.toUpperCase()}</label>}
            <label className={`images-card-answer-label ${classFour}`}> {answerFour}</label>
          </div>
        </div>
        <a href="#0" className='button-next-card' onClick={func}>{text}</a>
      </div>
    )
  }
}

export default ImageCardSolution;