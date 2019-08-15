import React, { Component } from 'react'
import withAuth from '../components/withAuth.js';
import cloudImage from '../images/cloud.svg';
import firebase from "firebase";
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

class Profile extends Component {
  state = {
    isUploading: false,
    progress: 0,
    profileImage: this.props.user.profileImage
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => {
    const newProgress = progress < 100 && progress + 1;
    this.setState({ progress: newProgress, isUploading: true });
  }

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({ profileImage: url })
      });
  };

  render() {
    const { isUploading, progress, profileImage } = this.state;
    const user = this.props.user;

    return (
      <div className="container profile-creation">
        <div className="profile-creation-textbox">
          <h1>Welcome {user.name}</h1>
          <p>tell us about you :)</p>
          <span className="triangle"></span>
        </div>
        <CustomUploadButton
          accept="image/*"
          name="avatar"
          randomizeFilename
          storageRef={firebase.storage().ref("images")}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        >
          {!isUploading ? (
            <div className="profile-image-container" onClick={this.uploadImage}>
              <div className="profile-image" style={{ backgroundImage: `url(${this.state.profileImage})` }}></div>
              <img src={cloudImage} alt="cloud icon" />
            </div>
          ) : (
              <div className="profile-image-loading">
                <div style={{ backgroundImage: `url(${this.state.profileImage})` }}></div>
                <p>{progress}</p>
              </div>

            )
          }
        </CustomUploadButton>

      </div>
    )
  }
}

export default withAuth(Profile);