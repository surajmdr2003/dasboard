import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Typeahead} from 'react-bootstrap-typeahead';
class AutoCompleteField extends Component {
  render() {
    const pv = this.props.value; // Note: pv = prop value
    const value = (pv !== null && typeof pv === 'object' && pv.hasOwnProperty('id'))
      ? [{id: pv.id, label: pv.label}]
      : [];

    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <Typeahead
          labelKey="label"
          placeholder={this.props.placeholder}
          onChange={(selected) => this.props.callback(this.props.fieldName, selected.length ? selected[0][this.props.keyValue] : '')}
          options={this.props.data}
          selected={value}
        />
        <small className="form-text text-error">{value.length ? '' : this.props.errorMsg}</small>
      </div>
    );
  }
}

// Component props validation
AutoCompleteField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  keyValue: PropTypes.string,
  fieldName: PropTypes.string,
  data: PropTypes.array,
  placeholder: PropTypes.string,
  errorMsg: PropTypes.string,
  callback: PropTypes.func.isRequired,
};

export default AutoCompleteField;
