'use strict';
const _ = require('lodash');

const isNativeType = (value) => {
  return _.isString(value) || _.isNumber(value);
};

const extendKeyNamesByPrefix = (prefix, json) => {
  return _.forOwn(json, (value, key) => {
    delete json[key];
    json[`${prefix}.${key}`] = value;
  });
};

const horizontal = (json, collector) => {
  if(_.isUndefined(collector)) {
    collector = {};
  }

  _.forOwn(json, (value, key) => {

    if(isNativeType(value)) {
      collector[key] = value;
    }

    if(_.isArray(value)) {

    } else {
      let parsed = horizontal(value);
      parsed = extendKeyNamesByPrefix(key, parsed)
      _.assign(collector, parsed);
    }

  });

  return collector;
};

module.exports = {
  horizontal: horizontal
};
