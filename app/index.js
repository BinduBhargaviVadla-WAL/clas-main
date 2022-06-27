import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';

import Root from './Root';
import { history } from './store/configureStore';
import store from './store';
import './app.global.scss';
import setupAxios from './config/axios';
import { baseURL, env } from './config/env';
import 'react-notifications-component/dist/theme.css';

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

setupAxios();

setTimeout(() => {
  console.log('baseURL', baseURL);
  console.log('env', env);
}, 5000);

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);
