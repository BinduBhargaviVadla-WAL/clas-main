/* eslint-disable react/prop-types */
import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { FiDownload } from 'react-icons/fi';

const IconHelper = ({ iconType, iconColor, className }) => {
  const Components = {};
  Components.FaInfoCircle = (
    <FaInfoCircle color={iconColor} className={className} />
  );
  Components.MdOutlineEmail = (
    <MdOutlineEmail color={iconColor} className={className} />
  );
  Components.FiDownload = (
    <FiDownload color={iconColor} className={className} />
  );

  return Components[iconType];
};

export default IconHelper;
