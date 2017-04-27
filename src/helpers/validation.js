import inputValidation from '../config/inputValidation';

const isEmpty = value => value === undefined || value === null || value === '';

export default {
  isEmpty,
  isEmail: (value) => {
    if (isEmpty(value) || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return false;
    } return true;
  },
  isUsername: (value) => {
    const usernameTest = new RegExp(inputValidation.user.username.regExp);
    if (isEmpty(value)
        || value.length < inputValidation.user.username.min
        || value.length > inputValidation.user.username.max
        || !usernameTest.test(value)) {
      return false;
    } return true;
  },
  isPassword: (value) => {
    if (isEmpty(value)
        || value.length < inputValidation.user.password.min) {
      return false;
    } return true;
  },
  isConfirmValue: (value, confirmValue) => {
    if (value !== confirmValue) {
      return false;
    } return true;
  },
  foundStringIn: (value, textToFind) => {
    if (!isEmpty(value) && value.indexOf(textToFind) > -1) {
      return true;
    } return false;
  },
};
