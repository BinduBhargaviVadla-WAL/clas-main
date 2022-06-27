export default {
  COMMON_SETTINGS: {
    animationIn: ['animated', 'fadeIn'],
    container: 'top-right',
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      showIcon: true,
      duration: 5000
    }
  },
  SUCCESS: {
    title: 'Successful',
    type: 'success'
  },
  ERROR: {
    title: 'Error',
    type: 'danger'
  },
  WARNING: {
    title: 'Warning',
    type: 'warning'
  },
  GENERIC_ERROR_NOTIFICATION: {
    title: 'Error',
    message: 'Something went wrong. Please retry in sometime.',
    type: 'danger'
  },
  FORM_SEND_SUCCESS: {
    title: 'Successful',
    message: 'Forms are shared successfully.',
    type: 'success'
  },
  FORM_SEND_ERROR: {
    title: 'Error',
    message: 'Form could not be shared. Please retry in sometime.',
    type: 'danger'
  },
  FORM_VOID_SUCCESS: {
    title: 'Successful',
    message: 'Form is voided successfully.',
    type: 'success'
  },
  FORM_VOID_ERROR: {
    title: 'Error',
    message: 'Form could not be voided. Please retry in sometime.',
    type: 'danger'
  },
  FORM_DOWNLOAD_SUCCESS: {
    title: 'Successful',
    message: 'Form is downloaded successfully.',
    type: 'success'
  },
  FORM_DOWNLOAD_ERROR: {
    title: 'Error',
    message: 'Form could not be downloaded. Please retry in sometime.',
    type: 'danger'
  },
  FORM_PREVIEW_ERROR: {
    title: 'Error',
    message:
      'We encountered an error in previewing the form. Please retry in sometine.',
    type: 'danger'
  },
  FORM_ADD_CONTACT_ERROR: {
    title: 'Error',
    message: 'Unable to add contact. Please retry in sometime.',
    type: 'danger'
  },
  RESERVE_PROPERTY_SUCCESS: {
    title: 'Successful',
    message: 'Reserved the property successfully.',
    type: 'success'
  },
  RELEASE_PROPERTY_SUCCESS: {
    title: 'Successful',
    message: 'Released the property successfully.',
    type: 'success'
  },
  CONFIRM_PROPERTY_SUCCESS: {
    title: 'Successful',
    message: 'Property confirmed was successful.',
    type: 'success'
  },
  REVIEW_PROPERTIES_WARNING: {
    title: 'Warning',
    message: 'Please reserve atleast one property to proceed.',
    type: 'warning'
  },
  NETWORK_ERROR_NOTIFICATION: {
    title: 'Connectivity Issue',
    message: 'Please check your internet and VPN connection.',
    type: 'danger'
  },
  SCHEDULE_DOWNLOAD_SUCCESS: {
    title: 'Successful',
    message: 'Financing schedule is downloaded.',
    type: 'success'
  },
  COMMON_FINANCE_REVOKE_SUCCESS: {
    title: 'Successful',
    type: 'success'
  },
  DOWNLOAD_SUCCESS: {
    title: 'Successful',
    message: 'File is downloaded successfully',
    type: 'success'
  },
  DOWONLOAD_ERROR: {
    title: 'Error',
    message:
      'We encountered an error in status of the form. Please retry in sometine.',
    type: 'danger'
  },
  DISCOUNT_ERROR: {
    title: 'Error',
    message: 'PIF cannot be applied, as active finance available',
    type: 'danger'
  },
  PAYMENT_SUMMARY_DOWNLOAD_SUCCESS: {
    title: 'Successful',
    message: 'File is downloaded successfully',
    type: 'success'
  },
  PAYMENT_SUMMARY_DOWNLOAD_ERROR: {
    title: 'Error',
    message: 'File could not be downloaded. Please try again',
    type: 'danger'
  },
  PIA_DECLINED_FINANCE: {
    title: 'Error',
    message:
      'Cannot apply the adjustment because Active Finance is not available',
    type: 'danger'
  }
};
