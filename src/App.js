import React, { Component, Fragment } from 'react';
import Routes from './Routes';

class App extends Component {
  /**
   * Component constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  // Render App
  render() {
    return (
      <Fragment>
        <Routes/>
      </Fragment>
    );
  }
}

export default App;
