import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import withAuth from '../components/withAuth.js';
import cloudImage from '../images/cloud.svg';
import location from '../images/location.svg';
import cake from '../images/cake.svg';
import profile from '../images/profile.svg';
import firebase from "firebase";
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
const gender = require('../helpers/gender');

class Profile extends Component {
  state = {
    isUploading: false,
    progress: 0,
    profileImage: this.props.user.profileImage,
    name: this.props.user.name,
    location: "",
    age: "Birthday",
    secondPage: false
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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleLogout = () => {
    this.props.logout()
      .then(response => {
        return <Redirect to="/" />
      })
  }

  nextPage = () => {
    this.setState({
      secondPage: true
    })
    console.log(this.state.location)
  }

  render() {
    const { isUploading, progress, secondPage } = this.state;
    const user = this.props.user;
    const classStyle = "form " + (secondPage ? "active" : "");
    return (
      <div className="container profile-creation">
        <div className="profile-container">
          <div className="profile-creation-textbox">
            <h1>Welcome {user.name}</h1>
            <p>tell us about you :)</p>
            <span className="triangle"></span>
          </div>
          <form className={classStyle} autoComplete="off">
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
            <input className="input" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
            <div className="input-icons">
              <div className="tag">
                location
            </div>
              <img src={location} alt="location" />
              <input className="input-no-line" type="text" name="location" value={this.state.location} onChange={this.handleChange} placeholder="e.g. Barcelona" />
            </div>
            <div className="input-icons input-birthday">
              <div className="tag">
                birthday
            </div>
              <img src={cake} alt="location" />
              <input id="input-birthday" className="input-no-line" type="date" name="age" value={this.state.age} onChange={this.handleChange} placeholder="Birthdate" required="required" />
            </div>
            <div className="input-icons input-birthday">
              <div className="tag">
                gender
          </div>
              <img src={profile} alt="location" />
              <select className="selector">
                {gender.map((gen, i) => { return <option key={i}>{gen}</option> })}
              </select>
            </div>
          </form>
          <a className="btn-text" href="#0" onClick={this.nextPage}>NEXT&rarr;</a>
          <a onClick={this.handleLogout}>Logout</a>
        </div>
      </div >
    )
  }
}

export default withAuth(Profile);