import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import cogoToast from 'cogo-toast';

// AWS Amplify Related
import { Auth } from 'aws-amplify';

// Components
import HeaderLogin from '../components/HeaderLogin';

// Required Assets
const loginBanner = '/assets/images/login-banner.jpg';

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const showGreetingMessage = () => {
    const hrs = new Date().getHours();
    let greet;

    if (hrs < 12) {greet = 'Good Morning!';} else if (hrs >= 12 && hrs <= 17) {greet = 'Good Afternoon!';} else if (hrs >= 17 && hrs <= 24) {greet = 'Good Evening!';}

    return greet;
  };

  useEffect(() => {
    setIsLoading(true);
    Auth.currentAuthenticatedUser()
      .then(() => {
        // Hide loader/spinner
        setIsLoading(false);

        // Redirect user to Dashboard
        props.history.push('/dashboard');
      })
      .catch(() => {
        cogoToast.warn('User Not Signed In!', { position: 'bottom-left' });
        setIsLoading(false);
      });
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
                  <h3><span>{showGreetingMessage()}</span> <br /> Welcome back.</h3>
                </div>
                <button type="button"
                  className="btn btn-primary btn-lg btn-block"
                  onClick={() => Auth.federatedSignIn()}>
                  {
                    isLoading
                      ? <div className="spinner-grow spinner-grow-sm" role="status"> <span className="sr-only">Loading...</span></div>
                      : 'Sign IN'
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

Login.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Login);
