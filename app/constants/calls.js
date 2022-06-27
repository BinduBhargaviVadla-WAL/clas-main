export const callStatus = [
  { value: 1, label: 'No Contact', className: 'call-tag-noContact' },
  { value: 2, label: 'Converted', className: 'call-tag-converted' },
  {
    value: 3,
    label: 'Contact - Left message',
    className: 'call-tag-contactLeft'
  },
  {
    value: 4,
    label: 'Pending Appointment',
    className: 'call-tag-pendingAppt'
  },
  { value: 5, label: 'Appointment set', className: 'call-tag-appointmentSet' },
  { value: 6, label: 'Follow up required', className: 'call-tag-followup' },
  {
    value: 7,
    label: 'Completed - No Contact',
    className: 'call-tag-completedNoContact'
  },
  {
    value: 8,
    label: 'Completed - Contact ; Left Message',
    className: 'call-tag-completedContactLeft'
  },
  {
    value: 9,
    label: 'Completed - Follow up needed',
    className: 'call-tag-completedFollowUpNeeded'
  },
  {
    value: 10,
    label: 'Completed - Call closed',
    className: 'call-tag-completedCallClosed'
  },
  {
    value: 11,
    label: 'Lost - Selected other Facilities',
    className: 'call-tag-lost'
  },
  {
    value: 12,
    label: 'Lost - No Contact',
    className: 'call-tag-lost'
  },
  {
    value: 13,
    label: 'Lost - PN-AN Change of Facilities',
    className: 'call-tag-lost'
  }
];

export const reasonOptions = [
  { value: 1, label: 'Someone has Passed' },
  { value: 2, label: 'Interested in Pre-Arrangement' },
  { value: 3, label: 'Maintenance Request' },
  { value: 4, label: 'Memorial Restoration' }
];

export const locationOptions = [
  { value: 1, label: 'Cypress Lawn Cremation Society', code: 'CCS' },
  { value: 2, label: 'Cypress Lawn', code: 'CFS' },
  { value: 3, label: 'All County Cremation Service', code: 'ACC' },
  { value: 4, label: 'Crosby-N. Gray & Co. Funeral Home', code: 'CNG' },
  {
    value: 5,
    label: 'Miller-Dutra Coastside Chapel & Funeral Home',
    code: 'MDC'
  },
  {
    value: 6,
    label: 'Sneider & Sullivan & O’Connell’s Funeral Home',
    code: 'SSO'
  }
  // { value: 7, label: 'Cypresslawn Olivet', code: 'COM' }
];
export const cemeteryLocationOptions = [
  { value: 2, label: 'Cypress Lawn', code: 'CFS' }
];

export const callReasonOptions = [
  { value: 1, label: 'Someone has Passed' },
  { value: 2, label: 'Interested in Pre-Arrangement' },
  { value: 3, label: 'Maintenance Request' },
  // { value: 4, label: 'Memorial Restoration', isDisabled: true },
  { value: 5, label: 'Genealogy Search' },
  { value: 6, label: 'Other Inquiries' }
];

export const callReasonTypes = {
  SOMEONE_HAS_PASSED: 'Someone has Passed',
  INTERESTED_IN_PREARRANGEMENT: 'Interested in Pre-Arrangement',
  MAINTENANCE_REQUEST: 'Maintenance Request',
  MEMORIAL_RESTORATION: 'Memorial Restoration',
  GENEALOGY_SEARCH: 'Genealogy Search',
  OTHER: 'Other Inquiries'
};

export const callReasonValues = {
  SOMEONE_HAS_PASSED: 1,
  INTERESTED_IN_PREARRANGEMENT: 2,
  MAINTENANCE_REQUEST: 3,
  MEMORIAL_RESTORATION: 4,
  GENEALOGY_SEARCH: 5,
  OTHER: 6
};

export const deletedReasons = [
  { value: 1, label: 'Caller decided on other facility' },
  { value: 2, label: 'Cannot connect with Caller' },
  { value: 3, label: 'PN turn AN – Transfer to other facility' },
  { value: 4, label: 'Pricing does not match expectations' },
  { value: 5, label: 'Facilities does not meet expectations' },
  { value: 6, label: 'Service requested not part of offerings' }
];

export const notesCategory = [
  { value: 1, label: 'Call' },
  { value: 2, label: 'Scheduling' },
  { value: 3, label: 'Agreement' },
  { value: 4, label: 'Special Request' },
  { value: 6, label: 'Funeral Scheduling Resource Section' }
];

export const callersPreferredLangOptions = [
  { value: 1, label: 'English' },
  { value: 2, label: 'Chinese - Cantonese' },
  { value: 3, label: 'Chinese - Mandarin' },
  { value: 4, label: 'Spanish' },
  { value: 5, label: 'Tagalog' }
];

export const facilityTypeOptions = [
  { value: 1, label: 'Hospital', normalizedName: 'hospital' },
  { value: 2, label: 'Nursing Home', normalizedName: 'nursinghome' },
  { value: 3, label: 'Church', normalizedName: 'church' },
  { value: 4, label: 'Cemetery', normalizedName: 'cemetery' },
  { value: 5, label: 'Crematory', normalizedName: 'crematory' },
  { value: 6, label: 'Hospice', normalizedName: 'hospice' },
  {
    value: 7,
    label: 'Medical Examiner Office',
    normalizedName: 'medicalexamineroffice'
  },
  { value: 8, label: 'Funeral Home', normalizedName: 'funeralhome' },
  { value: 9, label: 'Insurance', normalizedName: 'insurance' },
  { value: 10, label: 'Other', normalizedName: 'other' },
  { value: 11, label: 'TBD', normalizedName: 'tbd' },
  {
    value: 12,
    label: 'Funeral Service Location',
    normalizedName: 'funeralservicelocation'
  },
  {
    value: 13,
    label: 'Cemetery Service Location',
    normalizedName: 'cemeteryservicelocation'
  }
];

export const prefixOptions = [
  { value: 'Mr', label: 'Mr' },
  { value: 'Ms', label: 'Ms' },
  { value: 'Mrs', label: 'Mrs' }
];

export const servicesOfferedOptions = [
  { value: 'funeral', label: 'Funeral' },
  { value: 'cemetery', label: 'Cemetery' },
  { value: 'Both', label: 'Both' }
];

export const lorOrgType = facilityTypeOptions;

export const serviceReportOptions = [
  {
    value: 1,
    label: 'Monument & marker'
  },
  {
    value: 2,
    label: 'Mowing & Trimming'
  },
  {
    value: 3,
    label: 'Plants & Trees'
  },
  {
    value: 4,
    label: 'Sod'
  },
  {
    value: 5,
    label: 'Pesticides'
  },
  {
    value: 6,
    label: 'Ground'
  },
  {
    value: 7,
    label: 'Loose crypt or niche plate'
  },
  {
    value: 8,
    label: 'Vase'
  },
  {
    value: 9,
    label: 'Missing item (Memento)'
  },
  {
    value: 10,
    label: 'Other'
  }
];

export const followUpRequiredOptions = [
  { value: 1, label: 'Heritage Foundation Questions' },
  { value: 2, label: 'Upcoming Tour Informations' },
  { value: 3, label: 'Upcoming Events Informations' },
  { value: 4, label: 'Cemetery Related' },
  { value: 5, label: 'Funeral Home Related' },
  { value: 6, label: 'Technical Assistance for Cypress Technologies' },
  { value: 7, label: 'Existing Account Inquiry' },
  { value: 8, label: 'Career' }
];

export const callTypes = [
  { value: 1, label: 'Call' },
  { value: 2, label: 'WalkIn' }
];

export const callReasons = {
  1: 'Someone has Passed',
  2: 'Interested in Pre-Arrangement',
  3: 'Maintenance Request',
  5: 'Genealogy Search',
  6: 'Other Inquiries'
};

export const locationAddressCL = {
  1: {
    line1: '1201 El Camino Real',
    city: 'Colma',
    state: 'California',
    country: 'United States',
    county: '',
    zipcode: '94014'
  },
  2: {
    line1: '1370 El Camino Real',
    city: 'Colma',
    state: 'California',
    country: 'United States',
    county: '',
    zipcode: '94014'
  },
  3: {
    line1: '1201 El Camino Real',
    city: 'Colma',
    state: 'California',
    country: 'United States',
    county: '',
    zipcode: '94014'
  },
  4: {
    line1: '2 Park Road',
    city: 'Burlingame',
    state: 'California',
    country: 'United States',
    county: '',
    zipcode: '94010'
  },
  5: {
    line1: '645 Kelly Avenue',
    city: 'Half Moon Bay',
    state: 'California',
    country: 'United States',
    county: '',
    zipcode: '94019'
  },
  6: {
    line1: '977 S El Camino Real',
    city: 'San Mateo',
    state: 'California',
    country: 'United States',
    county: '',
    zipcode: '94402'
  }
};

export const invalidNumbers = ['+', '-', 'e'];

export const callErrors = {
  CALL_NOT_FOUND: 'Unable to fetch call details. Please try again later.'
};

export const certifierRequiredServices = ['funeral', 'Both'];

export const cremationTypeOptions = [
  { value: 1, label: 'Standard Cremation' },
  { value: 2, label: 'Witness Cremation' },
  { value: 3, label: 'Priority Cremation' }
];
