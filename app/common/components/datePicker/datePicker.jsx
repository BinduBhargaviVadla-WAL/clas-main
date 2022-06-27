/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Flatpickr from 'react-flatpickr';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import cx from 'classnames';
import 'flatpickr/dist/themes/light.css';

const DatePicker = ({
  name,
  label,
  options,
  required,
  showIcon,
  formInput,
  placeholder,
  ...rest
}) => {
  return (
    <div
      className={cx('datepicker-wrapper input-field date-input-field', {
        'with-icon': showIcon
      })}
    >
      {label && (
        <label htmlFor={name}>
          {label} <span>{required ? '*' : ''}</span>
        </label>
      )}
      <div className="daterange-container w-100">
        <Flatpickr
          {...rest}
          placeholder={placeholder}
          options={{
            ...options
          }}
        />
      </div>
      {formInput && (
        <div className="error-msg">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.objectOf(PropTypes.string),
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  showIcon: PropTypes.bool,
  formInput: PropTypes.bool,
  placeholder: PropTypes.string
};

DatePicker.defaultProps = {
  label: '',
  options: {},
  disabled: false,
  required: false,
  showIcon: false,
  formInput: true,
  placeholder: 'Select Date'
};

export default DatePicker;
