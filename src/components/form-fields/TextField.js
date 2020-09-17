import React from 'react';
import PropTypes from 'prop-types';

const TextField = (props) => {
  return (
    <div className="form-group">
      {addLabel(props.identifier, props.label)}
      <div className="form-feild">
        {addIcon(props.iconUrl)}
        <input id={props.identifier} type={props.type} className="form-control"
          placeholder={props.placeholder}
          onChange={(data) => props.callback(props.fieldName, data.target.value)}
          value={props.value} />
      </div>
      <small className="form-text text-error">{(props.value) ? '' : props.errorMsg}</small>
    </div>
  );
}

/**
   * Check for Icon
   *
   * @param {String} iconPath
   *
   * @return {JSX}
   */
const addIcon = (iconPath) => {
  return ((iconPath) ? <img src={iconPath} className="form-icon" /> : '');
}

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
}

// Component props validation
TextField.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  fieldName: PropTypes.string,
  identifier: PropTypes.string,
  type: PropTypes.string,
  iconUrl: PropTypes.string,
  placeholder: PropTypes.string,
  errorMsg: PropTypes.string,
  callback: PropTypes.func,
};

export default TextField;
