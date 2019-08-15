import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../components/withAuth.js';

class Signup extends Component {

  state = {
    name: '',
    password: '',
    rePassword: '',
    email: ''
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const password = this.state.password;
    const email = this.state.email;

    this.props.signup({ name, password, email })
      .then((user) => {
        this.setState({
          name: '',
          password: '',
          rePassword: '',
          email: ''
        });
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { name, password, rePassword, email } = this.state;
    return (
      <div className="container">
        <form onSubmit={this.handleFormSubmit} className="form" autoComplete="off">
          <label htmlFor='email'>Email:</label>
          <input id='email' type='email' name='email' value={email} onChange={this.handleChange} />
          <label htmlFor='name'>Name:</label>
          <input id='name' type='text' name='name' value={name} onChange={this.handleChange} />
          <label htmlFor='password'>Password:</label>
          <input id='password' type='password' name='password' value={password} onChange={this.handleChange} />
          <label htmlFor='rePassword'>Repeat password:</label>
          <input id='rePassword' type='password' name='rePassword' value={rePassword} onChange={this.handleChange} />
          <input type='submit' value='Signup' />
        </form>

        <p>Already have account?
          <Link to={'/login'}> Login</Link>
        </p>

      </div>
    )
  }
}

export default withAuth(Signup);