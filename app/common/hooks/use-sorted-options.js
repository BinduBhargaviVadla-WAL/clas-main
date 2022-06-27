import { useEffect, useState } from 'react';
import _ from 'lodash';

const sortFn = (option = { label: '' }) => {
  return option.label.toLowerCase();
};

const useSortedOptions = (options = [], sort = false) => {
  const [listOptions, setListOptions] = useState(options);
  const newOptions =
    options && options.length ? options.filter(opt => opt.label !== 'All') : [];
  useEffect(() => {
    const sortedList = sort ? _.sortBy(newOptions, [sortFn]) : newOptions;
    if (
      newOptions.length &&
      options.length &&
      newOptions.length !== options.length
    )
      sortedList.unshift({ value: null, label: 'All' });
    setListOptions(sortedList);
  }, [options, sort]);

  return listOptions;
};

export default useSortedOptions;
