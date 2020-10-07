import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Welcome extends Component {
  render() {
    return (
      <div className="landing-page text-center">
        <h1>This is Loanding Page</h1>
        <Link to="/login" className="btn btn-small btn-primary">Go to Login</Link>
      </div>
    );
  }
}

export default Welcome;
