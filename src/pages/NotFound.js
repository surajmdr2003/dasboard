import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const pageWrap = {
  minHeight: '100vh',
  color: '#FFFFFF',
};

const LinkTag = {
  textDecoration: 'none',
  color: '#FFFFFF',
};

class NotFound extends Component {
  render() {
    return (
      <div className="page-wrap d-flex flex-row align-items-center" style={pageWrap}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <span className="display-1 d-block">404</span>
              <div className="mb-4 lead">The page you are looking for was not found.</div>
              <div className="btn btn-lg btn-warning">
                <Link style={LinkTag} to="#" onClick={ () => this.props.history.goBack() }>
                  <span>Back to previous page</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Props validation
NotFound.propTypes = {
  history: PropTypes.any,
};

export default NotFound;
