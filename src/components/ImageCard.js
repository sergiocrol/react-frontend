import React, { Component } from 'react';

class ImageCard extends Component {
  render() {
    const images = this.props.content;
    console.log(images[0].imageUrl)
    return (
      <div>
        <h2 className="card-title">
          NAME THE IMAGES
        </h2>
        <div className="images-card-container">
          <div>
            <div className="images-card-image-container"> <img src={`${images[0].imageUrl}`} alt="one" /> </div>
            <input name="answerOne" value='' type="text" className="images-card-answer-input" onChange='' placeholder="ANSWER" />
          </div>
          <div>
            <div className="images-card-image-container"> <img src={images[1].imageUrl} alt="two" /> </div>
            <input name="answerOne" value='' type="text" className="images-card-answer-input" onChange='' placeholder="ANSWER" />
          </div>
          <div>
            <div className="images-card-image-container"> <img src={images[2].imageUrl} alt="three" /> </div>
            <input name="answerOne" value='' type="text" className="images-card-answer-input" onChange='' placeholder="ANSWER" />
          </div>
          <div>
            <div className="images-card-image-container"> <img src={images[3].imageUrl} alt="four" /> </div>
            <input name="answerOne" value='' type="text" className="images-card-answer-input" onChange='' placeholder="ANSWER" />
          </div>
        </div>
        <a href="#0" className='' onClick=''>SOLUTION</a>
      </div>
    )
  }
}

export default ImageCard;