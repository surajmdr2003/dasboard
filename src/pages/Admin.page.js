import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Auth} from 'aws-amplify';

// Global context
import GlobalContext from '../context/GlobalContext';

// Services
import AdvertiserService from '../services/advertiser.service';

// Components
import HeaderMain from '../components/navigation/HeaderMain';
import Footer from '../components/Footer';

const AdminPages = ({ children }) => {
  const {setUser} = React.useContext(GlobalContext);
  const [state, setState] = useState({ isLoading: true });

  useEffect(() => {
    setState({isLoading: true});
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
            setState({ isLoading: false });
          });
      })
      .catch(() => {
        console.log('Not signed in yet!');
        setState({ isLoading: false });
      });
  }, []);

  return (
    <Fragment>
      {
        (state.isLoading)
          ? <div className="text-center m-5">
            <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
          </div>
          : (<Fragment>
            <HeaderMain />
            <div className="main-container">
              {children}
            </div>
            <Footer />
          </Fragment>)
      }
    </Fragment>
  );
};

AdminPages.propTypes = {
  children: PropTypes.object,
};

export default AdminPages;
