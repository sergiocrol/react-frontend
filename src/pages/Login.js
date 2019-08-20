import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';
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
  console.log(this.props)
    return (
      <div className="container">
        <h1>Login</h1>
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
            //.min(8, "Password is too short - should be 8 characters minimum")
            //.matches(/(?=.*[0-9])/, "Password must contain...")
          })}
        >
          {
            props => {
              const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;

              return (
                <form className="login-form" onSubmit={handleSubmit}>
                  <label htmlFor='email' >email:</label>
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
                  <button type='submit' disabled={isSubmitting}>
                    Login
                  </button>
                </form>
              );
            }
          }
        </Formik>

        <p>You don't have an accout yet?
            <Link to={'/signup'}> Signup</Link>
        </p>
      </div>
    )
  }
}

export default withAuth(Login);