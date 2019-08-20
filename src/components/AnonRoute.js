import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import withAuth from './withAuth';

const AnonRoute = (props) => {
  const { isLoggedIn, component: Component, ...rest } = props;
  return (
    <>
      {!isLoggedIn ? <Route
        render={(props) => {
          return <Component {...props} />
        }}
        {...rest}
      /> : props.location.pathname === '/signup' ? <Redirect to='/signup/profile' /> : <Redirect to='/home' />}
    </>


  );
}

export default withAuth(AnonRoute);
