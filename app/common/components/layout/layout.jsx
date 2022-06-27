import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import Sidebar from '../sidebar';

const Layout = props => {
  const { children } = props;
  return (
    <>
      <Header />
      <Sidebar />
      <div className="layout-content">{children}</div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

Layout.defaultProps = {
  children: null
};

export default Layout;
