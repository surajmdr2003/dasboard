import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextAreaField extends Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.identifier}>{this.props.label}</label>
        <textarea id={this.props.identifier} className="form-control" placeholder={this.props.placeholder}
          onChange={(data) => this.props.callback(this.props.fieldName, data.target.value)} value={this.props.value}/>
        <small className="form-text text-error">{this.props.errorMsg}</small>
      </div>
    );
  }
}

// Component props validation
TextAreaField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  fieldName: PropTypes.string,
  identifier: PropTypes.string,
  placeholder: PropTypes.string,
  errorMsg: PropTypes.string,
  callback: PropTypes.func.isRequired,
};

export default TextAreaField;
