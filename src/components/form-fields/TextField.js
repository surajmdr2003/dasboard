import React from 'react';
import PropTypes from 'prop-types';

const TextField = (props) => {
  return (
    <div className="form-group">
      {addLabel(props.identifier, props.label)}
      <div className="form-feild">
        <input
          id={props.identifier}
          name={props.fieldName}
          type={props.type}
          className="form-control"
          placeholder={props.placeholder}
          ref={props.register} />
      </div>
      <small className="form-text text-error">{props.errorMsg}</small>
    </div>
  );
};

/**
 * Check for label
 *
 * @param {String} identifier
 * @param {String} label
 *
 * @return {JSX}
 */
const addLabel = (identifier, label) => {
  return ((label) ? <label htmlFor={identifier}>{label}</label> : '');
};

// Component props validation
TextField.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  fieldName: PropTypes.string,
  identifier: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  errorMsg: PropTypes.string,
  register: PropTypes.func,
};

export default TextField;
