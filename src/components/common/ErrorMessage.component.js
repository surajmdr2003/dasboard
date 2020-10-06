import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ error }) => {
  if (error) {
    return (
      <p className="text-danger text-small">
        {error.message}
      </p>
    );
  }

  return null;
};

ErrorMessage.propTypes = {
  field: PropTypes.string,
  error: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  }),
};

export default ErrorMessage;
