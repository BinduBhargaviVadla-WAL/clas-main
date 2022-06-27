import { createNamespacer, createReducer } from '../utils/reducers';
import { serverAddress } from '../config/env';

const { port } = JSON.parse(localStorage.getItem('user') || '{}');

const initialState = {
  serverUrl: serverAddress.hostname,
  serverPort: port || serverAddress.port,
  serverProtocol: serverAddress.protocol.slice(
    0,
    serverAddress.protocol.length - 1
  )
};

const namespacer = createNamespacer('SERVER_DETAILS');

const handlers = {
  [`${namespacer('SET_SERVER_ENDPOINT')}`]: (state, action) => {
    return {
      ...state,
      serverUrl: action.payload.value
    };
  },
  [`${namespacer('SET_SERVER_PORT')}`]: (state, action) => {
    return {
      ...state,
      serverPort: action.payload.value
    };
  }
};

const serverReducer = createReducer(initialState, handlers, ['SERVER_DETAILS']);

export default serverReducer;
