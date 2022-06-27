import _ from 'lodash';
import moment from 'moment';
import { store } from 'react-notifications-component';
import { LOG_IN_AGAIN } from '../constants/errors';
import notificationConstants from '../constants/notificationConstants';
import { dateFormat } from '../constants/formats';

let isNetworkNotificationDisplayed = 0;

// eslint-disable-next-line import/prefer-default-export
export const createFilterChangeHandler = onChange => (
  name,
  path = 'target.value'
) => e => {
  const newValue = _.get(e, path, e);

  onChange({
    [name]: newValue
  });
};

export const apiErrorHandler = (errorRes, showWarning) => {
  // This specific error is being handled in global response interceptors.
  if (errorRes?.response?.data?.message === LOG_IN_AGAIN) return;

  if (errorRes.message === 'Network Error') {
    store.addNotification({
      ...notificationConstants.COMMON_SETTINGS,
      ...notificationConstants.NETWORK_ERROR_NOTIFICATION,
      dismiss: {
        duration: 3000
      }
    });
  } else {
    let error;
    if (
      _.get(errorRes, 'response.data.error.errors') &&
      _.get(errorRes, 'response.data.error.errors').length &&
      typeof _.get(errorRes, 'response.data') === 'object'
    ) {
      error = _.get(errorRes, 'response.data.error.errors[0].message', '');
    } else if (typeof _.get(errorRes, 'response.data') === 'object') {
      error =
        _.get(errorRes, 'response.data.error.message', null) ||
        _.get(errorRes, 'response.data.message', null) ||
        _.get(errorRes, 'response.data.messages', null) ||
        _.get(errorRes, 'response.data.error', null) ||
        _.get(errorRes, 'message');
    } else {
      error = _.get(errorRes, 'response.statusText');
    }
    store.addNotification({
      ...notificationConstants.COMMON_SETTINGS,
      ...notificationConstants[showWarning ? 'WARNING' : 'ERROR'],
      dismiss: {
        duration: 3000
      },
      message: error
    });
  }
};

export const successHandler = res => {
  store.addNotification({
    ...notificationConstants.COMMON_SETTINGS,
    ...notificationConstants.SUCCESS,
    ...res.message
  });
};

export const warningHandler = (message, options = {}) => {
  store.addNotification({
    ...notificationConstants.COMMON_SETTINGS,
    ...notificationConstants.WARNING,
    message,
    ...options
  });
};

export const errorHandler = (message, options = {}) => {
  store.addNotification({
    ...notificationConstants.COMMON_SETTINGS,
    ...notificationConstants.ERROR,
    message,
    ...options
  });
};

export const networkErrorHandler = () => {
  if (!isNetworkNotificationDisplayed) {
    isNetworkNotificationDisplayed = true;

    store.addNotification({
      ...notificationConstants.COMMON_SETTINGS,
      ...notificationConstants.NETWORK_ERROR_NOTIFICATION,
      onRemoval: () => {
        isNetworkNotificationDisplayed = false;
      }
    });
  }
};

export const getServiceDate = poItem => {
  const poItems = poItem.filter(item => {
    return moment(item.serviceDate).isValid();
  });

  const serviceDates = [];
  poItems.map(item => {
    serviceDates.push(item.serviceDate);
    return item;
  });

  if (!serviceDates.length) {
    return '-';
  }

  const minServiceDate = serviceDates.reduce((a, b) => {
    return a < b ? a : b;
  });
  return moment(minServiceDate).format(dateFormat);
};

export const getStartDateEndDate = value => {
  let startDate = null;
  let endDate = null;
  switch (value) {
    case 'today':
      startDate = moment()._d;
      endDate = moment()._d;
      break;
    case 'last_7':
      startDate = moment().subtract(7, 'days')._d;
      endDate = moment()._d;
      break;
    case 'last_1_months':
      startDate = moment().subtract(1, 'months')._d;
      endDate = moment()._d;
      break;
    case 'last_3_months':
      startDate = moment().subtract(3, 'months')._d;
      endDate = moment()._d;
      break;
    case 'last_6_months':
      startDate = moment().subtract(6, 'months')._d;
      endDate = moment()._d;
      break;
    case 'last_1_year':
      startDate = moment().subtract(1, 'years')._d;
      endDate = moment()._d;
      break;
    case 'next_30_days':
      startDate = moment().add(1, 'days')._d;
      endDate = moment().add(31, 'days')._d;
      break;
    case 'next_45_days':
      startDate = moment().add(1, 'days')._d;
      endDate = moment().add(46, 'days')._d;
      break;
    case 'next_60_days':
      startDate = moment().add(1, 'days')._d;
      endDate = moment().add(61, 'days')._d;
      break;
    case 'next_120_days':
      startDate = moment().add(1, 'days')._d;
      endDate = moment().add(121, 'days')._d;
      break;
    default: {
      startDate = 'selected value does not match';
      endDate = 'selected value does not match';
    }
  }
  return { startDate, endDate };
};
