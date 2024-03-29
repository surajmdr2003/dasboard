import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import cogoToast from 'cogo-toast';

const PrivateRoute = ({ component: Component, ...args }) => {
  const [state, setState] = useState({
    isLoading: true,
    isLoggedIn: false,
  });

  useEffect(() => {
    setState({...state, isLoading: true});
    Auth.currentAuthenticatedUser()
      .then(() => {
        setState({
          isLoading: false,
          isLoggedIn: true,
        });
      })
      .catch(() => {
        cogoToast.warn('User Not Signed In!', {position: 'bottom-left'});
        setState({
          isLoading: false,
          isLoggedIn: false,
        });
      });
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
          state.isLoggedIn
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
      />
    );
  };

  return ((state.isLoading && !state.isLoggedIn) ? renderLoader() : renderComponent());
};

// Props Validation
PrivateRoute.propTypes = {
  component: PropTypes.any,
  location: PropTypes.object,
};

export default PrivateRoute;
