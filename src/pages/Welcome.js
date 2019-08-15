import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="container">
      <h1>Welcome</h1>
      <Link to="/home">explore</Link>
      <Link to="/login">login</Link>
    </div>
  )
}

export default Welcome;
