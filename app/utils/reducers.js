export const createNamespacer = namespace => action => `${namespace}:${action}`;
export const getNamespace = action => {
  return action.type.split(':')[0];
};
export const getAction = action => {
  return action.type.split(':')[1];
};

export const createReducer = (initialState, handlers, namespaces) => {
  return (state = initialState, action) => {
    if (!action) {
      return state;
    }

    if (!action.type?.startsWith('@@') && !action.payload) {
      console.group('Action not structured properly.');
      console.warn('Every action must have a payload attached.');
      console.warn(action);
      console.groupEnd();
      return state;
    }

    if (namespaces.includes(getNamespace(action))) {
      if (handlers[action.type]) {
        return handlers[action.type](state, action);
      }
    }

    return state;
  };
};
