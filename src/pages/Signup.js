import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import withAuth from '../components/withAuth.js';

class Signup extends Component {

  state = {
    name: '',
    password: '',
    rePassword: '',
    email: '',
    emailExist: false
  };

  handleFormSubmit = (values) => {
    const { name, password, rePassword, email } = values;

    this.props.signup({ name, password, email, rePassword })
      .then((user) => {
        this.setState({
          name: '',
          password: '',
          rePassword: '',
          email: ''
        });
      })
      .catch(error => this.setState({ emailExist: true }))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="container">
        <h1>Signup</h1>
        <Formik
          initialValues={{ email: '', password: '', rePassword: '', name: '' }}
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
              .min(6, "Password is too short - should be 6 characters minimum")
              .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/, "Password must contain: 1 number, 1 capital letter and 1 special character"),
            rePassword: Yup.string()
              .oneOf([Yup.ref('password'), null], "Passwords must match")
              .required('Password confirm is required'),
            name: Yup.string()
              .required("Required"),
          })}
        >
          {
            props => {
              const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;

              return (
                <form onSubmit={handleSubmit} className="form" autoComplete="off">
                  <label htmlFor='email'>Email:</label>
                  <input id='email' type='email' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur}
                    className={errors.email && touched.email && "error"} />
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                  )}
                  <label htmlFor='name'>Name:</label>
                  <input id='name' type='text' name='name' value={values.name} onChange={handleChange} onBlur={handleBlur}
                    className={errors.name && touched.name && "error"} />
                  {errors.name && touched.name && (
                    <div className="input-feedback">{errors.name}</div>
                  )}
                  <label htmlFor='password'>Password:</label>
                  <input id='password' type='password' name='password' value={values.password} onChange={handleChange} onBlur={handleBlur}
                    className={errors.password && touched.password && "error"} />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                  <label htmlFor='rePassword'>Repeat password:</label>
                  <input id='rePassword' type='password' name='rePassword' value={values.rePassword} onChange={handleChange} onBlur={handleBlur}
                    className={errors.rePassword && touched.rePassword && "error"} />
                  {errors.rePassword && touched.rePassword && (
                    <div className="input-feedback">{errors.rePassword}</div>
                  )}
                  {this.state.emailExist ? <div className="input-feedback">This email is already in use</div> : null}
                  <button type='submit' disabled={isSubmitting}>
                    Signup
                  </button>
                </form>
              );
            }
          }
        </Formik>

        <p>Already have account?
          <Link to={'/login'}> Login</Link>
        </p>

      </div>
    )
  }
}

export default withAuth(Signup);