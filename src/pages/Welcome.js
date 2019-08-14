import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const Welcome = () => {
  return (
    <div>
      <h1><FormattedMessage id="Welcome.dayMessage" defaultMessage="Welcome" /></h1>
      <Link to="/home">explore</Link>
      <Link to="/login">login</Link>
    </div>
  )
}

export default Welcome;
