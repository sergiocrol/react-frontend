import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import logo from '../images/hitza.svg';
import * as Yup from 'yup';
import withAuth from '../components/withAuth';


class Login extends Component {
  state = {
    email: '',
    password: '',
    wrongCredentials: false,
    logged: false
  }

  handleFormSubmit = (values) => {
    const { email, password } = values;

    this.props.login({ email, password })
      .then((user) => {
        this.setState({
          logged: true
        })
      })
      .catch(error => this.setState({ wrongCredentials: true }))
  }

  handleChange = (event) => {
    this.setState({
      wrongCredential: false
    })
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="login-container u-padding-top-big">
        <div className="profile-creation-textbox u-margin-top-big">
          <h1>login</h1>
          <span className="triangle"></span>
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            this.handleFormSubmit(values);
            setSubmitting(false);
          }}

          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required("Required"),
            password: Yup.string()
              .required("Required")
          })}
        >
          {
            props => {
              const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;

              return (
                <div>
                  <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor='email' >Email:</label>
                    <input id='email' type='text' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur}
                      className={errors.email && touched.email && "error"} />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}
                    <label htmlFor='password'>Password:</label>
                    <input id='password' type='password' name='password' value={values.password} onChange={handleChange} onBlur={handleBlur}
                      className={errors.password && touched.password && "error"} />
                    {errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )}
                    {this.state.wrongCredentials ? <div className="input-feedback">Wrong email/password</div> : null}
                    <button className="btn-text-login u-margin-top-small u-margin-bottom-medium" type='submit' disabled={isSubmitting}>
                      Login &rarr;
                  </button>
                  </form>
                </div>
              );
            }
          }
        </Formik>

        <p>Don't have an accout yet?
            <Link to={'/signup'}> Signup</Link>
        </p>

        <div className="logo-bar"> <img src={logo} alt="logo" /> </div>
      </div>
    )
  }
}

export default withAuth(Login);