import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';

// Global context
import GlobalContext from '../../context/GlobalContext';

// Services
import AdvertiserService from '../../services/advertiser.service';

const PrivateRoute = ({ component: Component, ...args }) => {
  const [state, setState] = useState({
    isLoading: true,
    isLoggedIn: false,
  });

  // Use GLobal User Context
  const {setUser} = React.useContext(GlobalContext);

  useEffect(() => {
    setState({...state, isLoading: true});
    Auth.currentAuthenticatedUser()
      .then(session => {
        AdvertiserService.getAdvertiser()
          .then((response) => {
            const user = {...response.data};

            user.username = session.getSignInUserSession().getIdToken().payload['cognito:username'];
            user.permissions = session.getSignInUserSession().getAccessToken().payload['cognito:groups'];

            // Set user in global context
            setUser(user);

            // Hide loader/spinner
            setState({
              isLoading: false,
              isLoggedIn: true,
            });
          });
      })
      .catch(() => {
        console.log('Not signed in yet!');
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
          state.isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
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
