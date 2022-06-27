import _ from 'lodash';
import store from '../../store';

const setAppDataLoading = value => {
  store.dispatch({
    type: 'APPEARANCE:SET_APP_DATA_LOADING',
    payload: {
      value
    }
  });
};

export default async () => {
  try {
    setAppDataLoading(true);
  } catch (error) {
    console.error(error);
  } finally {
    setAppDataLoading(false);
  }
};
