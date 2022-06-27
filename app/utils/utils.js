import _ from 'lodash';

export const getFileNameFromUrl = (url = '') => {
  const name = decodeURI(
    _.replace(url, /%2F/g, '/')
      .split('/')
      .pop()
      .substring(
        _.replace(url, /%2F/g, '/')
          .split('/')
          .pop()
          .indexOf('-') + 1
      )
  );
  if (name.lastIndexOf('?') > -1) {
    return name.substring(0, name.lastIndexOf('?'));
  }
  return name;
};
