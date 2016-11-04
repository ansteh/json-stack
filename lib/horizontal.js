'use strict';
const _ = require('lodash');
const Util = require('./util.js');

const horizontal = (json, collector) => {
  if(_.isUndefined(collector)) {
    collector = {};
  }

  _.forOwn(json, (value, key) => {
    if(Util.isNativeType(value)) {
      collector[key] = value;
    } else if(_.isArray(value)) {
      let parsed = parseArrayHorizontally(value, key);
      _.assign(collector, parsed);
    } else {
      let parsed = horizontal(value);
      parsed = extendKeyNamesByPrefix(key, parsed)
      _.assign(collector, parsed);
    }
  });

  return collector;
};

const extendKeyNamesByPrefix = (prefix, json) => {
  return _.forOwn(json, (value, key) => {
    delete json[key];
    json[`${prefix}.${key}`] = value;
  });
};

const parseArrayHorizontally = (collection, prefix) => {
  let collector = {};

  _.forEach(collection, (value, index) => {
    let key = `${prefix}.${index}`;

    if(Util.isNativeType(value)) {
      collector[key] = value;
    } else if(_.isArray(value)) {
      let parsed = parseArrayHorizontally(value, key);
      _.assign(collector, parsed);
    } else {
      let parsed = horizontal(value);
      parsed = extendKeyNamesByPrefix(key, parsed)
      _.assign(collector, parsed);
    }

  });

  return collector;
};

module.exports = horizontal;
