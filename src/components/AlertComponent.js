import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AlertComponent = ({message, alert, isLoading, show}) => {
  const [display, setDisplay] = useState(true);

  const handleClose = () => {
    setDisplay(false);
  };

  return (
    <div className={show ? '' : 'd-none'}>
      <div className={`alert alert-${alert} alert-dismissible` + (display ? '' : ' d-none')}>
        <button type="button" className="close" data-dismiss="alert" onClick={() => handleClose()}>&times;</button>
        <strong>{isLoading ? <span className="spinner-grow spinner-grow-sm mr-2" role="status"/> : ''}</strong>
        <small>{message}</small>
      </div>
    </div>
  );
};

AlertComponent.propTypes = {
  message: PropTypes.string,
  alert: PropTypes.string,
  isLoading: PropTypes.bool,
  show: PropTypes.bool,
};

export default AlertComponent;
