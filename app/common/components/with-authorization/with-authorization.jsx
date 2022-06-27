import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

const AuthorizationWrapper = (WrappedComponent, { modules = [] }) => {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const Authorization = props => {
    const { dispatch, permissions, ...rest } = props;
    const userPermissions = {};

    if (permissions) {
      modules.forEach(module => {
        const access = permissions[module];
        userPermissions[module.toUpperCase()] = access;
      });
    } else {
      modules.forEach(module => {
        userPermissions[module.toUpperCase()] = {
          read: false,
          write: false,
          delete: false
        };
      });
    }

    return <WrappedComponent {...rest} permissions={userPermissions} />;
  };

  Authorization.displayName = `WithAuthorization(${displayName})`;
  return Authorization;
};

const mapStateToProps = state => ({
  permissions: state?.support?.policies?.permissions
});

const withAuthorization = compose(
  connect(mapStateToProps),
  AuthorizationWrapper
);

export default withAuthorization;
