import axios from 'axios';
import { getToken, logout } from '../common/routines/user-operations';
import { LOG_IN_AGAIN } from '../constants/errors';
import { warningHandler, networkErrorHandler } from '../utils/handlers';
import store from '../store';
import { DOWNLOAD_HOST } from '../constants/axios';

const setupAxios = () => {
  const appState = store.getState();

  const baseURL = `${appState.server.serverProtocol}://${appState.server.serverUrl}:${appState.server.serverPort}/api/v1`;

  const instance = axios.create({
    baseURL
  });

  instance.interceptors.request.use(config => {
    const customConfig = config;
    const appServerState = store.getState();
    const appBaseURL = `${appServerState.server.serverProtocol}://${appServerState.server.serverUrl}:${appServerState.server.serverPort}/api/v1`;

    customConfig.baseURL = appBaseURL;
    customConfig.headers = {
      'Content-Type': 'application/json'
    };

    if (config.url !== '/login' && !config.url.includes(DOWNLOAD_HOST)) {
      customConfig.headers.Authorization = getToken();
    }

    return customConfig;
  });

  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error?.response?.status === 401) {
        console.log('auth failed');
        logout();
        if (error?.response?.data?.message === LOG_IN_AGAIN) {
          warningHandler(
            'Your role was changed recently. Please log in again',
            {
              container: 'top-right',
              dismiss: {
                duration: 3000
              }
            }
          );
        }
      } else if (error?.message === 'Network Error') {
        networkErrorHandler();
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default setupAxios;
