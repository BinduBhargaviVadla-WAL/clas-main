import _ from 'lodash';
import { createNamespacer, createReducer } from '../utils/reducers';
import { formatForDropdown } from '../common/routines/utils';
import items from '../constants/navigation';

const initialState = {
  users: [],
  locations: [],
  offline: [],
  navItems: _.cloneDeep(items)
};

const namespacer = createNamespacer('SUPPORT');

const handlers = {
  [namespacer('SET_USERS')]: (state, action) => {
    return {
      ...state,
      users: formatForDropdown(action.payload.value, 'Name', 'id')
    };
  },
  [namespacer('SET_LOCATIONS')]: (state, action) => {
    return {
      ...state,
      locations: action.payload.value
    };
  },
  [namespacer('SET_OFFLINE_DATA')]: (state, action) => {
    return {
      ...state,
      offline: action.payload.value
    };
  },
  [namespacer('SET_POLICIES')]: (state, action) => {
    return {
      ...state,
      policies: action.payload.value
    };
  },
  [namespacer('SET_SELECTED_LOCATION')]: (state, action) => {
    return {
      ...state,
      selectedLocation: action.payload.value
    };
  },
  [namespacer('SET_EMPLOYEES')]: (state, action) => {
    return {
      ...state,
      employees: action.payload.value
    };
  },
  [namespacer('SET_SEARCH_STRING')]: (state, action) => {
    return {
      ...state,
      searchString: action.payload.value
    };
  },
  [namespacer('SET_OPI_VALUE')]: (state, action) => {
    return {
      ...state,
      isOpi: action.payload
    };
  },
  [namespacer('SET_ADVANCED_SEARCH_PARAMS')]: (state, action) => {
    return {
      ...state,
      advancedSearchParams: action.payload.value
    };
  },
  [namespacer('CLEAR_ADVANCED_SEARCH_PARAMS')]: state => {
    return {
      ...state,
      advancedSearchParams: null
    };
  },
  [namespacer('RESET_STATE')]: state => {
    return {
      ...state,
      policies: {},
      navItems: _.cloneDeep(items)
    };
  },
  [namespacer('TOGGLE_SIDEBAR_CHILDREN')]: (state, action) => {
    const { index } = action.payload;
    const tempNavItems = [...state.navItems];
    tempNavItems[index].isOpen = !tempNavItems[index].isOpen;
    return {
      ...state,
      navItems: tempNavItems
    };
  }
};

const reducer = createReducer(initialState, handlers, ['SUPPORT']);

export default reducer;
