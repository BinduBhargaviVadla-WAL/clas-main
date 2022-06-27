import store from '../../store';

export const setServerUrl = value => {
  store.dispatch({
    type: 'SERVER_DETAILS:SET_SERVER_ENDPOINT',
    payload: {
      value
    }
  });
};

export const setServerPort = value => {
  store.dispatch({
    type: 'SERVER_DETAILS:SET_SERVER_PORT',
    payload: {
      value
    }
  });
};
