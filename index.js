'use strict';
const _ = require('lodash');

const vertical = (json) => {
  let head = {};
  let parts = [];

  _.forOwn(json, (value, key) => {
    if(isNativeType(value)) {

    } else if(_.isArray(value)) {
      parts.push(verticalCollection(key, value));
    } else {
      //console.log(vertical(value));
      let deep = vertical(value);
      _.forEach(deep, (value) => {
        extendKeyNamesByPrefix(key, value);
      });
      parts.push(deep);
    }
  });

  return _.flatten(parts);
};

const verticalCollection = (key, collection) => {
  let collector = [];

  _.forEach(collection, (value, index) => {
    let child = {};

    if(isNativeType(value)) {
      child[key] = value;
    } else if(_.isArray(value)) {

    } else {

    }

    collector.push(child);
  });

  return collector;
};

const partition = (json) => {
  let groups = {
    objects: [],
    arrays: []
  };

  _.forOwn(json, (value, key) => {
    if(_.isArray(value)) {
      groups.arrays.push({ key: key, value: value });
    } else {
      groups.objects.push({ key: key, value: value });
    }
  });

  return groups;
};

const isNativeType = (value) => {
  return _.isString(value) || _.isNumber(value);
};

const extendKeyNamesByPrefix = (prefix, json) => {
  return _.forOwn(json, (value, key) => {
    delete json[key];
    json[`${prefix}.${key}`] = value;
  });
};

module.exports = {
  horizontal: require('./lib/horizontal.js'),
  vertical: vertical
};
