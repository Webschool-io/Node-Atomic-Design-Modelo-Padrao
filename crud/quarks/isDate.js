'use strict';

module.exports = (value) => {
  if(Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) return true;
  return false;
}