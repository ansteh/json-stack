'use strict';
const _ = require('lodash');

const vertical = (json) => {
  let collector = {};
  let parts = [];

  _.forOwn(json, (value, key) => {
    if(isNativeType(value)) {
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
