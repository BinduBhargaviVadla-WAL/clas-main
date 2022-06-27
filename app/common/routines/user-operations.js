import store from '../../store';

export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem('user') || '{}');

export const getToken = () => {
  const { token } = getCurrentUser();

  return token || '';
};

export const login = (userDetails = {}) => {
  localStorage.setItem('user', JSON.stringify(userDetails));

  store.dispatch({
    type: 'SESSION:SET_IS_LOGGED_IN',
    payload: { value: true, email: userDetails.email }
  });
};

export const logout = () => {
  console.log('mine logout');
  store.dispatch({
    type: 'SESSION:SET_IS_LOGGED_IN',
    payload: {
      value: false
    }
  });

  // reset the dropdown value
  store.dispatch({
    type: 'SUPPORT:SET_OPI_VALUE',
    payload: 1
  });
  // reset the serach string
  store.dispatch({
    type: 'SUPPORT:SET_SEARCH_STRING',
    payload: { value: '' }
  });

  // Reset set loading to display login.
  store.dispatch({
    type: `APPEARANCE:SET_LOADING`,
    payload: {
      value: false
    }
  });

  // This resets two state variables.
  // 1. policies
  // reason: Policies of previousy logged in user should not be reused for new user.
  // 2. sidebar navItems
  // reason: All the changed content for the previousy logged in user should not be reused.
  // Eg: isOpen property
  store.dispatch({ type: 'SUPPORT:RESET_STATE', payload: { value: {} } });

  localStorage.removeItem('user');
};
