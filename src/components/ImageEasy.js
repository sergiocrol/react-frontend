import React, { Component } from 'react';
import firebase from "firebase";
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import upload from '../images/uploading.png';
import pillService from '../services/pill-service.js';

class ImageEasy extends Component {
  number = 'one';
  state = {
    imageOneUrl: <><img src={upload} alt="upload" /> <span className="span">upload photo<span className="triangle-two"></span></span></>,
    imageTwoUrl: <><img src={upload} alt="upload" /> <span className="span">upload photo<span className="triangle-two"></span></span></>,
    imageThreeUrl: <><img src={upload} alt="upload" /> <span className="span">upload photo<span className="triangle-two"></span></span></>,
    imageFourUrl: <><img src={upload} alt="upload" /> <span className="span">upload photo<span className="triangle-two"></span></span></>,
    isUploading: false,
    isUploadingOne: false,
    isUploadingTwo: false,
    isUploadingThree: false,
    isUploadingFour: false,
    answerOne: "",
    answertwo: "",
    answerThree: "",
    answerFour: "",
    progress: 0,
  };

  handleUploadStart = (number) => {
    this.number = number;
    switch (this.number) {
      case 'one':
        this.setState({ isUploadingOne: true, progress: 0 });
        break;
      case 'two':
        this.setState({ isUploadingTwo: true, progress: 0 });
        break;
      case 'three':
        this.setState({ isUploadingThree: true, progress: 0 });
        break;
      default:
        this.setState({ isUploadingFour: true, progress: 0 });
        break;
    }
    // this.setState({ isUploading: true, progress: 0 });
  }

  handleProgress = progress => {
    const newProgress = progress < 100 && progress + 1;
    switch (this.number) {
      case 'one':
        this.setState({ progress: newProgress, isUploadingOne: true });
        break;
      case 'two':
        this.setState({ progress: newProgress, isUploadingTwo: true });
        break;
      case 'three':
        this.setState({ progress: newProgress, isUploadingThree: true });
        break;
      default:
        this.setState({ progress: newProgress, isUploadingFour: true });
        break;
    }
    //this.setState({ progress: newProgress, isUploadingOne: true });
  }

  handleUploadError = error => {
    switch (this.number) {
      case 'one':
        this.setState({ isUploadingOne: false });
        break;
      case 'two':
        this.setState({ isUploadingTwo: false });
        break;
      case 'three':
        this.setState({ isUploadingThree: false });
        break;
      default:
        this.setState({ isUploadingFour: false });
        break;
    }
    //this.setState({ isUploadingOne: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    switch (this.number) {
      case 'one':
        this.setState({ progress: 100, isUploadingOne: false });
        firebase
          .storage()
          .ref("images")
          .child(filename)
          .getDownloadURL()
          .then(url => {
            this.setState({ imageOneUrl: <img src={url} alt="upload" /> })
          });
        break;
      case 'two':
        this.setState({ progress: 100, isUploadingTwo: false });
        firebase
          .storage()
          .ref("images")
          .child(filename)
          .getDownloadURL()
          .then(url => {
            this.setState({ imageTwoUrl: <img src={url} alt="upload" /> })
          });
        break;
      case 'three':
        this.setState({ progress: 100, isUploadingThree: false });
        firebase
          .storage()
          .ref("images")
          .child(filename)
          .getDownloadURL()
          .then(url => {
            this.setState({ imageThreeUrl: <img src={url} alt="upload" /> })
          });
        break;
      default:
        this.setState({ progress: 100, isUploadingFour: false });
        firebase
          .storage()
          .ref("images")
          .child(filename)
          .getDownloadURL()
          .then(url => {
            this.setState({ imageFourUrl: <img src={url} alt="upload" /> })
          });
        break;
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.props.toggle)
  }

  isComplete = () => {
    return (this.state.imageOneUrl.props.children === undefined &&
      this.state.imageTwoUrl.props.children === undefined &&
      this.state.imageThreeUrl.props.children === undefined &&
      this.state.imageFourUrl.props.children === undefined &&
      this.state.answerOne !== '' &&
      this.state.answerTwo !== '' &&
      this.state.answerThree !== '' &&
      this.state.answerFour !== '') ? true : false;
  }

  saveCard = () => {
    //let { type, pillId, images } = card;
    const { imageOneUrl, imageTwoUrl, imageThreeUrl, imageFourUrl, answerOne, answerTwo, answerThree, answerFour } = this.state;
    const type = 'imageEasy';
    const pillId = this.props.props.match.params.id;
    const images = [{ imageUrl: imageOneUrl.props.src, answer: answerOne.trim() }, { imageUrl: imageTwoUrl.props.src, answer: answerTwo.trim() }, { imageUrl: imageThreeUrl.props.src, answer: answerThree.trim() }, { imageUrl: imageFourUrl.props.src, answer: answerFour.trim() }]
    const card = { type, pillId, images };
    pillService.newCard(card)
      .then(card => {
        console.log(card);
        this.props.flip();
        this.props.toggle();
        return this.props.flip;
      })
  }

  render() {
    console.log(this.props.props.match.params.id)
    const complete = this.isComplete() ? "button-next-card" : "button-next-card u-is-disabled";
    const completeTwo = this.isComplete() ? this.saveCard : null;
    const { isUploadingOne, isUploadingTwo, isUploadingThree, isUploadingFour, progress, answerOne, answerTwo, answerThree, answerFour } = this.state;
    return (
      <div>
        <h2 className="card-title">
          <a href="#0" className="button-back-card" onClick={this.props.flip}>&#60; back</a>
          NAME THE IMAGES
        </h2>
        <div className="images-card-container">
          <div>
            <CustomUploadButton
              accept="image/*"
              name="avatar"
              randomizeFilename
              storageRef={firebase.storage().ref("images")}
              onUploadStart={() => { this.handleUploadStart('one') }}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            >
              {!isUploadingOne ? (
                <div className="images-card-image-container" onClick={this.uploadImage}> {this.state.imageOneUrl} </div>
              ) : (
                  <div className="profile-image-loading images-card-loading">
                    <div style={{ backgroundImage: `url(${this.state.imageOneUrl})` }}></div>
                    <p>{progress}</p>
                  </div>
                )
              }
            </CustomUploadButton>
            <input name="answerOne" value={answerOne || ''} type="text" className="images-card-answer-input" onChange={this.handleChange} placeholder="ANSWER" autoComplete="off"/>
          </div>
          <div>
            <CustomUploadButton
              accept="image/*"
              name="avatar"
              randomizeFilename
              storageRef={firebase.storage().ref("images")}
              onUploadStart={() => { this.handleUploadStart('two') }}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            >
              {!isUploadingTwo ? (
                <div className="images-card-image-container" onClick={this.uploadImage}> {this.state.imageTwoUrl} </div>
              ) : (
                  <div className="profile-image-loading images-card-loading">
                    <div style={{ backgroundImage: `url(${this.state.imageTwoUrl})` }}></div>
                    <p>{progress}</p>
                  </div>
                )
              }
            </CustomUploadButton>
            <input name="answerTwo" value={answerTwo || ''} type="text" className="images-card-answer-input" onChange={this.handleChange} placeholder="ANSWER" autoComplete="off"/>
          </div>
          <div>
            <CustomUploadButton
              accept="image/*"
              name="avatar"
              randomizeFilename
              storageRef={firebase.storage().ref("images")}
              onUploadStart={() => { this.handleUploadStart('three') }}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            >
              {!isUploadingThree ? (
                <div className="images-card-image-container" onClick={this.uploadImage}> {this.state.imageThreeUrl} </div>
              ) : (
                  <div className="profile-image-loading images-card-loading">
                    <div style={{ backgroundImage: `url(${this.state.imageThreeUrl})` }}></div>
                    <p>{progress}</p>
                  </div>
                )
              }
            </CustomUploadButton>
            <input name="answerThree" value={answerThree || ''} type="text" className="images-card-answer-input" onChange={this.handleChange} placeholder="ANSWER" autoComplete="off"/>
          </div>
          <div>
            <CustomUploadButton
              accept="image/*"
              name="avatar"
              randomizeFilename
              storageRef={firebase.storage().ref("images")}
              onUploadStart={() => { this.handleUploadStart('four') }}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            >
              {!isUploadingFour ? (
                <div className="images-card-image-container" onClick={this.uploadImage}> {this.state.imageFourUrl} </div>
              ) : (
                  <div className="profile-image-loading images-card-loading">
                    <div style={{ backgroundImage: `url(${this.state.imageFourUrl})` }}></div>
                    <p>{progress}</p>
                  </div>
                )
              }
            </CustomUploadButton>
            <input type="text" name="answerFour" value={answerFour || ''} className="images-card-answer-input" onChange={this.handleChange} placeholder="ANSWER" autoComplete="off"/>
          </div>
        </div>
        <a href="#0" className={complete} onClick={completeTwo}>NEXT CARD</a>
      </div>
    )
  }
}

export default ImageEasy;
