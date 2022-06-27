import axios from '.';

export const login = data => {
  return axios({
    method: 'POST',
    url: '/login',
    data
  });
};
