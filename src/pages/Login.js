import React, { useEffect, Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';

// AWS Amplify Related
import { Auth } from 'aws-amplify';

// Components
import HeaderLogin from '../components/HeaderLogin';

// Required Assets
const loginBanner = './assets/images/login-banner.jpg';

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log('currentAuthenticatedUser', user);
        setIsLoading(false);
        props.history.push('/dashboard');
      })
      .catch(() => console.log('Not signed in yet!'))
      .finally(() => setIsLoading(false));
  }, []);

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
                <button type="button"
                  className="btn btn-primary btn-lg btn-block"
                  onClick={() => Auth.federatedSignIn()}>
                  {
                    isLoading
                      ? <div class="spinner-grow spinner-grow-sm" role="status"> <span class="sr-only">Loading...</span></div> 
                      : 'Sign Now!'
                  }
                </button>
              </div>
            </div>
            <div className="col-md-7 col-sm-6 has-banner-image">
              <div className="banner-image" style={{ backgroundImage: `url(${loginBanner})` }} />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default withRouter(Login);
