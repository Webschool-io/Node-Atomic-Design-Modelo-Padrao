'use strict';

module.exports = (value) => {
  let isEmpty = require('./isEmpty')(value);
  let isString = require('./isString')(value);
  if(isEmpty) return false;
  if(!isString) return false;
  return value.length > 3;
}