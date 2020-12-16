import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

// CogoToast
import cogoToast from 'cogo-toast';

// Utilities
import Storage from '../utilities/Storage';

const pageWrap = {
  minHeight: '100vh',
};

class NotFound extends Component {
  render() {
    return (
      <div className="page-wrap d-flex flex-row align-items-center" style={pageWrap}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <span className="display-1 d-block">403</span>
              <div className="mb-4 lead">The page you are trying to access is not authorized.</div>
              <div>
                <Link className="btn btn-lg btn-primary" to="#" onClick={(e) => this.signOut(e)}>
                  <span>Sign out Now!</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Sign out Current Logged In User
   */
  signOut = (event) => {
    event.preventDefault();
    Storage.removeItem('current:user');
    cogoToast.success('You are signed out successsfully!', { position: 'bottom-center' });
    setTimeout(() => {
      Auth.signOut();
    }, 1500);
  };
}

// Props validation
NotFound.propTypes = {
  history: PropTypes.any,
};

export default NotFound;
