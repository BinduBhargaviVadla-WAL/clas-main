import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getCurrentUser } from './common/routines/user-operations';
import loadAppData from './common/routines/load-app-data';
import ProtectedRoute from './ProtectedRoute';

const mstp = state => {
  return {
    isLoggedIn: state.session.isLoggedIn,
    appDataLoading: state.appearance.appDataLoading,
    permissions: state.support?.policies?.permissions
  };
};
const mdtp = dispatch => {
  return {
    setLoggedIn: value => {
      dispatch({
        type: 'SESSION:SET_IS_LOGGED_IN',
        payload: { value }
      });
    }
  };
};
export default connect(
  mstp,
  mdtp
)(props => {
  useEffect(() => {
    console.log('use effect');
    const loggedIn = !_.isEmpty(getCurrentUser());
    props.setLoggedIn(loggedIn);
  }, []);
  useEffect(() => {
    if (props.isLoggedIn) {
      loadAppData();
    }
  }, [props.isLoggedIn]);

  return <ProtectedRoute isLoggedIn={props.isLoggedIn} />;
});
