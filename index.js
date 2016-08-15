'use strict';
const _ = require('lodash');

const horizontal = (json, collector) => {
  if(_.isUndefined(collector)) {
    collector = {};
  }

  _.forOwn(json, (value, key) => {
    if(isNativeType(value)) {
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

const isNativeType = (value) => {
  return _.isString(value) || _.isNumber(value);
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

    if(isNativeType(value)) {
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

module.exports = {
  horizontal: horizontal,
  vertical: vertical
};
