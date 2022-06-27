/* eslint-disable react/prop-types */
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import ReactNotification from 'react-notifications-component';
import Routes from './Routes';
import 'react-notifications-component/dist/theme.css';

const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ReactNotification />
      <Routes />
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
