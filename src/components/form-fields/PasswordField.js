import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PasswordField = (props) => {
    const [showPassword, togglePassword] = useState(false);
    const [showToolip, toggleTooltip] = useState(false);

    return (
        <div className="form-group">
            <label htmlFor="password">
                {props.label}
                <a href="" className="forgotpassword-link float-right" onClick={() => toggleTooltip(!showToolip)} >Forgot Password?
                    <span className={"tooltop " + ((showToolip) ? 'd-block' : 'd-none')}>Please contact your RAIN account manager for your login credentials.</span>
                </a>
            </label>
            <div className="field-wt-icon">
                <input 
                    id={props.identifier} 
                    type={(showPassword) ? 'text' : 'password'} className="form-control"
                    placeholder={props.placeholder}
                    onChange={(data) => props.callback(props.fieldName, data.target.value)}
                    value={props.value} />
                <i className={(showPassword) ? 'icon-eye-slash' : 'icon-eye'} onClick={() => togglePassword(!showPassword)}></i>
            </div>
            <small className="form-text text-error">{(props.value) ? '' : props.errorMsg}</small>
        </div>
    );
}


// Component props validation
PasswordField.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    fieldName: PropTypes.string,
    identifier: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    errorMsg: PropTypes.string,
    callback: PropTypes.func,
};

export default PasswordField;
