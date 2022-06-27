import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appearance from './appearance';
import session from './session';
import server from './server';
import support from './support';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    appearance,
    session,
    server,
    support
  });
}
