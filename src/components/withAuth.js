import React, { Component } from 'react'
import { AuthContext } from '../contexts/auth-context.js';

const withAuth = (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {({ user, isLoggedIn, login, signup, logout, updateUser, currentUser }) => (
            <Comp
              user={user}
              isLoggedIn={isLoggedIn}
              login={login}
              signup={signup}
              logout={logout}
              updateUser={updateUser}
              currentUser={currentUser}
              {...this.props}
            />
          )}
        </AuthContext.Consumer>
      )
    }
  }
}

export default withAuth;