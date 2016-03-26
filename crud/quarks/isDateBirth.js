'use strict';

module.exports = (value) => {
  const isEmpty = require('../isEmpty/isEmpty')(value);
  const isDate = require('../isDate/isDate')(value);

  if(isEmpty) return false;
  if(!isDate) return false;

  return true;
}