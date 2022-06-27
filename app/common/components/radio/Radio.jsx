/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Label, Input } from 'reactstrap';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Radio = ({
  name,
  value,
  label,
  disabled,
  required,
  formInput,
  defaultChecked,
  ...rest
}) => {
  const inputRef = React.createRef();

  useEffect(() => {
    if (defaultChecked) {
      inputRef.current.checked = true;
    }
  }, []);
  return (
    <div className={classNames('input-radio radio m-0', { disabled })}>
      <Label className="m-0">
        {formInput ? (
          <Field
            name={name}
            ref={inputRef}
            type="radio"
            value={value}
            disabled={disabled}
            {...rest}
          />
        ) : (
          <Input
            type="radio"
            innerRef={inputRef}
            name={name}
            disabled={disabled}
            {...rest}
          />
        )}
        <span>
          <i className="fas fa-circle" />
        </span>
        {label} <span>{required ? '*' : ''}</span>
      </Label>
    </div>
  );
  // <Label className="radio" disabled={disabled}>
  //   <Field name={name} type="radio" value={value} disabled={disabled} />
  //   <span>
  //     <i className="fas fa-circle" />
  //   </span>
  //   <span className="label">{label}</span>
  // </Label>
};

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  formInput: PropTypes.bool,
  defaultChecked: PropTypes.bool
};

Radio.defaultProps = {
  disabled: false,
  required: false,
  formInput: true,
  defaultChecked: false
};

export default Radio;
