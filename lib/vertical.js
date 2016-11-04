'use strict';
const _ = require('lodash');
const Util = require('./util.js');

const vertical = (json) => {
  if(Util.isNativeType(json)) {
    return json;
  }

  let collector = {};
  let parts = [];

  _.forOwn(json, (value, key) => {
    if(Util.isNativeType(value)) {
      if(parts.length > 0) {
        _.forEach(parts, (row) => {
          row[key] = value;
        });
      } else {
        collector[key] = value;
      }
    } else if(_.isArray(value)) {
      let collection = verticalCollection(key, value);
      if(parts.length > 0) {
        let expansion = [];
        _.forEach(parts, (row) => {
          _.forEach(collection, (item) => {
            expansion.push(_.assing(_.cloneDeep(row), item));
          });
        });
        parts = expansion;
      } else {
        _.forEach(collection, (item) => {
          parts.push(_.assign(_.cloneDeep(collector), item));
        });
      }
    } else {
      let deep = vertical(value);
      if(_.isArray(deep)) {
        if(parts.length > 0) {
          let expansion = [];
          _.forEach(parts, (row) => {
            _.forEach(deep, (item) => {
              extendKeyNamesByPrefix(key, item);
              expansion.push(_.assign(_.cloneDeep(row), item));
            });
          });
          parts = expansion;
        } else {
          _.forEach(deep, (item) => {
            extendKeyNamesByPrefix(key, item);
            parts.push(_.assign(_.cloneDeep(collector), item));
          });
        }
      } else {
        extendKeyNamesByPrefix(key, deep);
        if(parts.length > 0) {
          _.forEach(parts, (row) => {
            _.assign(row, deep);
          });
        } else {
          _.assign(collector, deep);
        }
      }
    }
  });

  if(parts.length === 0) {
    return collector;
  } else {
    return parts;
  }
};

const verticalCollection = (key, collection) => {
  return _.chain(collection)
    .map(vertical)
    .map(row => extendKeyNamesByPrefix(key, row))
    .value();
};

const extendKeyNamesByPrefix = (prefix, json) => {
  if(Util.isNativeType(json)) {
    return _.set({}, prefix, json);
  }

  return _.forOwn(json, (value, key) => {
    delete json[key];
    json[`${prefix}.${key}`] = value;
  });
};

module.exports = vertical;
