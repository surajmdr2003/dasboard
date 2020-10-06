import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const PrivateRoute = ({ component: Component, ...args }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false))
      .finally(() => setIsLoading(false));
  }, []);

  /**
   * Render Loading component
   */
  const renderLoader = () => {
    return (
      <div className="text-center m-5">
        <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
      </div>
    );
  };

  /**
   * Render Appropriate Component
   */
  const renderComponent = () => {
    return (
      <Route
        {...args}
        render={props =>
          isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />
    );
  };

  return ((isLoading && !isLoggedIn) ? renderLoader() : renderComponent());
};

// Props Validation
PrivateRoute.propTypes = {
  component: PropTypes.any,
  location: PropTypes.object,
};

export default PrivateRoute;
