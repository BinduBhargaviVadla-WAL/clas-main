/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-named-default */
import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import { default as ReactSelect } from 'react-select';
import classNames from 'classnames';
import useSortedOptions from '../../hooks/use-sorted-options';

const Select = ({
  label,
  formInput,
  name,
  required,
  className,
  placeholder,
  size,
  disabled,
  wrapperClassName,
  kind,
  rightContent,
  selectRef,
  options,
  sort,
  ...rest
}) => {
  const isMinimal = kind === 'minimal';
  const listOptions = useSortedOptions(options, sort);
  return (
    <div
      className={classNames(
        'select-wrapper',
        { minimal: isMinimal },
        size,
        wrapperClassName
      )}
    >
      {label && (
        <label htmlFor={name}>
          {label} <span>{required ? '*' : ''}</span>
        </label>
      )}
      {rightContent && (
        <span className="input-right-content">{rightContent}</span>
      )}
      <ReactSelect
        {...rest}
        classNamePrefix={className || 'select-dropdown'}
        isDisabled={disabled}
        placeholder={placeholder}
        ref={selectRef}
        options={listOptions}
      />
      {formInput && (
        <div className="error-msg">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};

Select.propTypes = {
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  formInput: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  isMulti: PropTypes.bool,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'none']),
  onChange: PropTypes.func.isRequired,
  kind: PropTypes.oneOf(['minimal', 'normal']),
  rightContent: PropTypes.node,
  options: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  sort: PropTypes.bool
};

Select.defaultProps = {
  className: '',
  formInput: false,
  required: false,
  disabled: false,
  label: '',
  placeholder: 'Select',
  size: 'lg',
  kind: 'normal',
  rightContent: '',
  isMulti: false,
  wrapperClassName: '',
  sort: false
};

export default Select;
