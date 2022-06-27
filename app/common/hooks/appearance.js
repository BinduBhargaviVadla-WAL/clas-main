import { useEffect } from 'react';
import store from '../../store';

export const useSetLoading = value => {
  useEffect(() => {
    store.dispatch({
      type: `APPEARANCE:SET_LOADING`,
      payload: {
        value
      }
    });
  }, [value]);
};
