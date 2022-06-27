/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Button as BsButton } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({
  children,
  disabled,
  kind,
  size,
  color,
  textTransform,
  className,
  ...rest
}) => {
  return (
    <BsButton
      disabled={disabled}
      className={classNames(
        'button',
        size,
        color,
        `text-${textTransform}`,
        kind,
        ...className.split(' ')
      )}
      {...rest}
    >
      {children}
    </BsButton>
  );
};

Button.propTypes = {
  kind: PropTypes.oneOf(['flat', 'outline', 'text']),
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'default']),
  children: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  textTransform: PropTypes.string
};

Button.defaultProps = {
  kind: 'flat',
  size: 'lg',
  color: 'primary',
  children: '',
  disabled: false,
  className: '',
  textTransform: 'uppercase'
};

export default Button;
