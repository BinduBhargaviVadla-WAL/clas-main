import moment from 'moment';

export const formatDate = (date, format = 'DD-MMM-YYYY') => {
  if (!date) {
    return '';
  }

  const momentDate = moment(date);
  if (momentDate.isValid()) {
    return momentDate.format(format);
  }
  return '-';
};

// price format - $1,000,000.00
const Currencyformatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
export const getPrice = price => {
  let dollarPrice = '0.00';
  if (price || price === 0) {
    dollarPrice = `${Math.abs(price)}`;
    if (price < 0) {
      dollarPrice = `-${dollarPrice}`;
    }
  }
  return Currencyformatter.format(dollarPrice);
};
