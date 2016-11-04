'use strict';
const _ = require('lodash');

exports.isNativeType = (value) => {
  return _.isString(value) || _.isNumber(value) || _.isBoolean(value);
};
