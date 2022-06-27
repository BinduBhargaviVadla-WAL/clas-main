/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Field, ErrorMessage } from 'formik';

const Input = ({
  icon,
  name,
  size,
  type,
  label,
  disabled,
  required,
  formInput,
  onKeyPress,
  placeholder,
  rightContent,
  ...rest
}) => {
  return (
    <div
      className={classNames('input-field', {
        'with-icon': icon,
        [icon]: icon
      })}
    >
      {label && (
        <label htmlFor={name}>
          {label} <span>{required ? '*' : ''}</span>
        </label>
      )}
      {rightContent && (
        <span className="input-right-content">{rightContent}</span>
      )}
      {formInput ? (
        <Field
          name={name}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          onKeyPress={onKeyPress}
          className={classNames('form-control', 'input', size)}
          {...rest}
        />
      ) : (
        <input
          className={classNames('input', size)}
          disabled={disabled}
          required={required}
          type={type}
          name={name}
          onChange={onKeyPress}
          placeholder={placeholder}
          {...rest}
        />
      )}
      {formInput && (
        <div className="error-msg">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
  type: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  formInput: PropTypes.bool,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  rightContent: PropTypes.node
};

Input.defaultProps = {
  icon: '',
  name: '',
  size: 'lg',
  type: 'text',
  label: '',
  disabled: false,
  required: false,
  formInput: false,
  onKeyPress: () => {},
  placeholder: '',
  rightContent: ''
};

export default Input;
