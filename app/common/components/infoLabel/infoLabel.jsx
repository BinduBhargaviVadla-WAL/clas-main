import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconHelper from './iconHelper';

const InfoLabel = ({
  label,
  size,
  weight,
  showIcon,
  iconType,
  iconColor,
  iconStyles,
  iconLocation,
  onClick
}) => {
  return (
    <div className="info-label-section" onClick={onClick}>
      {showIcon && iconLocation === 'Left' && (
        <IconHelper
          iconType={iconType}
          iconColor={iconColor}
          className={classNames('icon-style', { ...iconStyles })}
        />
      )}
      {label}
      {showIcon && iconLocation === 'Right' && (
        <IconHelper
          iconType={iconType}
          iconColor={iconColor}
          className={classNames('icon-style', { ...iconStyles })}
        />
      )}
    </div>
  );
};

InfoLabel.propTypes = {
  label: PropTypes.string,
  size: PropTypes.string,
  weight: PropTypes.string,
  showIcon: PropTypes.bool,
  iconType: PropTypes.string,
  iconColor: PropTypes.string,
  iconStyles: PropTypes.shape({}),
  iconLocation: PropTypes.string,
  onClick: PropTypes.func
};

InfoLabel.defaultProps = {
  label: '',
  size: '16px',
  weight: 600,
  showIcon: false,
  iconType: 'FaInfoCircle',
  iconColor: '#B4B1B1',
  iconStyles: {},
  iconLocation: 'Right',
  onClick: () => {}
};

export default InfoLabel;
