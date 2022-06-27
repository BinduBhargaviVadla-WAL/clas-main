/* eslint-disable import/prefer-default-export */

export const emailRegex = /^[a-zA-Z0-9_]([\.-]?[a-zA-Z0-9_])*@[a-zA-Z0-9_]([\.-]?[a-zA-Z0-9_])*(\.[a-zA-Z_]{2,})+$/;
export const nameRegex = /^[a-zA-Z-'.\s\u00C0-\u017F]*$/;
export const ssnRegex = /^(?!000|666)[0-7][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;
export const phoneRegex = /^[0-9]+$/;
export const numberWithTwoDecRegex = /^[0-9]*(\.[0-9]{0,2}){0,1}$/;
export const discountValueRegex = /^\d{1,8}(\.\d{1,2})?$/;
export const discountPercentRegex = /^\d{1,8}(\.\d{1,5})?$/;
export const numberWithThreeDigitsRegex = /^[\d]{1,3}$/;
export const numberWithTwoDigitsRegex = /^[\d]{1,2}$/;
export const newPhoneNumberRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
export const numberDecimalTwoPlaces = /^[0-9]\d{0,9}(\.\d{1,2})?%?$/;
export const numberWithEightDecRegex = /^\d{0,8}(\.\d{1,2})?$/;
