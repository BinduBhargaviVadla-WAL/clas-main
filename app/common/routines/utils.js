import _ from 'lodash';
import qs from 'querystring';
// import { getFileType } from '../../utils/file';
// import { VIDEO_FILE_TYPES } from '../components/upload-area/upload-area.constants';

export const fullName = (personalDetails, opts = {}) => {
  const { withPrefix = false } = opts;
  const nameObj = [
    personalDetails?.firstName,
    personalDetails?.middleName,
    personalDetails?.lastName
  ];
  if (withPrefix) nameObj.unshift(personalDetails?.prefix);

  return _.compact(nameObj).join(' ');
};

export const getFileNameFromUrl = (url = '') => {
  return decodeURI(
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
};

// eslint-disable-next-line import/prefer-default-export
export const formatForDropdown = (
  items = [],
  labelField = 'label',
  valueField = 'value',
  includeItem = false,
  additionalLabelField = ''
) => {
  return items.map(item => {
    const dropdownItem = {
      label: item[labelField],
      value: item[valueField]
    };

    if (includeItem) {
      dropdownItem.item = item;
    }
    if (_.get(item, additionalLabelField)) {
      dropdownItem.label += ` - ${_.get(item, additionalLabelField)}`;
    }
    return dropdownItem;
  });
};

export const formatForDropdownCallers = (
  items = [],
  labelField1 = 'label',
  labelField2 = 'label',
  labelField3 = 'label',
  valueField = 'value',
  includeItem = false,
  additionalLabelField = ''
) => {
  return items.map(item => {
    const dropdownItem = {
      label: `${item[labelField1]} ${item[labelField2]} ${item[labelField3]}`,
      value: item[valueField]
    };

    if (includeItem) {
      dropdownItem.item = item;
    }
    if (_.get(item, additionalLabelField)) {
      dropdownItem.label += ` - ${_.get(item, additionalLabelField)}`;
    }
    return dropdownItem;
  });
};

export const scrollToTop = () => {
  return window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

export const fileSizeInMB = sizeInBytes =>
  (sizeInBytes / (1024 * 1024)).toFixed(2);

export const parseQuery = (search = '') => {
  return qs.parse(search.split('?')[1]);
};

export const toCurrency = (value, noneValue = 'N/A', format = false) => {
  return value ? getPrice(value) : noneValue;
};

export const toPercentage = (value, noneValue = 'N/A') => {
  return value ? `${value} %` : noneValue;
};

// price format - $1,000,000.00
const formatter = new Intl.NumberFormat('en-US', {
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
  return formatter.format(dollarPrice);
};

export const fileTypeCheckFactory = types => file =>
  types.includes(file.type.split('/')[1]);

export const fileExtensionCheckFactory = types => file =>
  types.includes(
    file.name
      .split('.')
      .pop()
      .toLowerCase()
  );

export const fileMaxCheckFactory = maxSize => file =>
  fileSizeInMB(file.size) <= maxSize;

// export const validateFiles = (
//   files,
//   fileType,
//   maxSize,
//   maxFiles,
//   prevFilesLength = 0,
//   videoMaxSize
// ) => {
//   const totalFiles = prevFilesLength + files.length;
//   if (totalFiles > maxFiles) {
//     return {
//       isValid: false,
//       error: `Cannot select more than ${maxFiles} file(s).`
//     };
//   }
//   const fileExtensionCheck = fileExtensionCheckFactory(fileType);
//   if (files.every(file => !fileExtensionCheck(file))) {
//     const message =
//       files.length > 1
//         ? `One or more documents are not in valid format`
//         : `Only ${fileType.join(',').toUpperCase()} are supported`;
//     return {
//       isValid: false,
//       error: message
//     };
//   }
//   const sizeValidationError = files.every(file => {
//     const fileExtension = getFileType(file.name);
//     const fileMaxCheck = VIDEO_FILE_TYPES.includes(fileExtension)
//       ? fileMaxCheckFactory(videoMaxSize)
//       : fileMaxCheckFactory(maxSize);

//     return !fileMaxCheck(file);
//   });

//   if (sizeValidationError) {
//     const message =
//       files.length > 1
//         ? `One or more documents exceeds the max size limit of ${maxSize}MB`
//         : `Document exceeds the max size limit of ${maxSize}MB`;
//     return {
//       isValid: false,
//       error: message
//     };
//   }

//   return { isValid: true, error: '' };
// };

/* This function helps to check the validation of field that have type "number".If it is bad input it sets to null. */

export const amountChecker = (event, setFieldValue, fieldName, fieldValue) => {
  if (!event.target.validity.badInput) {
    setFieldValue(fieldName, event.target.value);
  } else {
    setFieldValue(fieldName, fieldValue || '');
  }
};

/* This function doesnt accept any '+' or '-' while giving input of type "number" */

export const keyPress = (event, setFieldValue, fieldName, fieldValue) => {
  if (['-', '+'].includes(event.key)) {
    if (!fieldValue) {
      setFieldValue(fieldName, ' ');
    }
  }
};

export const formatterForDropdownObject = (
  data,
  valueName = 'value',
  labelName = 'label',
  additionalLabelField = ''
) => {
  if (data) {
    const obj = { ...data };
    obj.value = _.get(data, valueName);
    delete obj[valueName];
    obj.label = _.get(data, labelName);
    delete obj[labelName];
    if (_.get(data, additionalLabelField)) {
      obj.label += ` - ${_.get(data, additionalLabelField)}`;
    }
    return obj;
  }
  return '';
};

// to fix the scrolling issue on windows
export const removeMultiselectTabIndexes = () => {
  const multiSelects = document.getElementsByClassName('multi-select');

  Array.from(multiSelects).forEach(el => {
    el.getElementsByClassName('dropdown')[0].removeAttribute('tabindex');
  });
};
