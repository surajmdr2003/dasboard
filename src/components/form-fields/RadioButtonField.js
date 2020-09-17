import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RadioButtoField extends Component {
  render() {
    return (
      <div className="form-group form-check">
        <input type="radio" className="form-check-input" id={this.props.identifier}
          onChange={(data) => this.props.callback(this.props.fieldName, data)}/>
        <label className="form-check-label" htmlFor={this.props.identifier}>{this.props.label}</label>
        <small className="form-text text-muted">{this.props.errorMsg}</small>
      </div>
    );
  }
}

// Component props validation
RadioButtoField.propTypes = {
  label: PropTypes.string,
  fieldName: PropTypes.string,
  identifier: PropTypes.string,
  errorMsg: PropTypes.string,
  callback: PropTypes.func.isRequired,
};


export default RadioButtoField;
