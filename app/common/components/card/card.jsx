/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Card as CsCard } from 'reactstrap';
// import PropTypes from 'prop-types';
import classNames from 'classnames';

const Card = ({
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
    <CsCard
      className={classNames(
        'card',
        size,
        kind,
        ...className.split(' ')
      )}
      {...rest}
    >
      {children}
    </CsCard>
  );
};

export default Card;
