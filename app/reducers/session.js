import { createNamespacer, createReducer } from '../utils/reducers';

const initialState = {
  isLoggedIn: false,
  user: null,
  email: null
};

const namespacer = createNamespacer('SESSION');

const handlers = {
  [namespacer('SET_IS_LOGGED_IN')]: (state, action) => {
    return {
      ...state,
      isLoggedIn: action.payload.value,
      email: action.payload.email
    };
  }
};

const reducer = createReducer(initialState, handlers, ['SESSION']);

export default reducer;
