import React, { Fragment, useState } from 'react';
import HeaderLogin from '../components/HeaderLogin';
import TextField from '../components/form-fields/TextField';
import PasswordField from '../components/form-fields/PasswordField';

const loginBanner = './assets/images/login-banner.jpg';

const Login = () => {
  const[formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (feildName, value) => {
    setFormData((preVal) => {
     return {
       ...preVal,
       [feildName]: value,
     }
    })
  } 

  return (
    <Fragment>
      <HeaderLogin />
      <section className="main-container login-page-container">
        <div className="container">
          <div className="full-height row align-items-center">
            <div className="col-md-5 col-sm-6">
              <div className="login-form-block">
                <div className="greeting-title">
                  <h3><span>Good evening!</span> <br /> Welcome back.</h3>
                </div>
                <form>
                  <div className="form-groups-wrapper">
                    <TextField 
                      label="Email address" 
                      className="form-control" 
                      identifier="emailAddress" 
                      placeholder="you@example.com" 
                      fieldName="email" 
                      value={formData.email}
                      callback={handleChange} />
                      
                    <PasswordField 
                      label="Password" 
                      type="password" 
                      className="form-control" 
                      identifier="password" 
                      placeholder="Please enter your password" 
                      fieldName="password" 
                      value={formData.password}
                      callback={handleChange}/>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg btn-block">Sign In</button>
                </form>
              </div>
            </div>
            <div className="col-md-7 col-sm-6 has-banner-image">
              <div className="banner-image" style={{backgroundImage: `url(${loginBanner})`}}></div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Login;