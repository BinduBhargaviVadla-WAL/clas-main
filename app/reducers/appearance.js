import { createNamespacer, createReducer } from '../utils/reducers';

const initialState = {
  isLoading: false,
  appDataLoading: false,
  showAdvanceSearch: false
};

const namespacer = createNamespacer('APPEARANCE');

const handlers = {
  [`${namespacer('SET_LOADING')}`]: (state, action) => {
    return {
      ...state,
      isLoading: action.payload.value
    };
  },
  [`${namespacer('SET_APP_DATA_LOADING')}`]: (state, action) => {
    return {
      ...state,
      appDataLoading: action.payload.value
    };
  }
};

const appearanceReducer = createReducer(initialState, handlers, ['APPEARANCE']);

export default appearanceReducer;
