import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CheckBoxField extends Component {
  render() {
    return (
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id={this.props.identifier}
          onChange={(data) => this.props.callback(this.props.fieldName, data)}/>
        <label className="form-check-label" htmlFor={this.props.identifier}>{this.props.label}</label>
        <small className="form-text text-muted">{this.props.errorMsg}</small>
      </div>
    );
  }
}

// Component props validation
CheckBoxField.propTypes = {
  label: PropTypes.string,
  fieldName: PropTypes.string,
  identifier: PropTypes.string,
  placeholder: PropTypes.string,
  errorMsg: PropTypes.string,
  callback: PropTypes.function,
};

export default CheckBoxField;
