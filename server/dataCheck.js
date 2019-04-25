/* eslint-disable no-restricted-syntax */
/* eslint-disable no-restricted-globals */
const idIsNaN = string => isNaN(Number(string));

const isDataObjDefined = (obj) => {
  for (const keys in obj) {
    if (!obj[keys] || obj[keys] === '') {
      return false;
    }
  }
  return true;
};


module.exports = {
  idIsNaN,
  isDataObjDefined,
};
