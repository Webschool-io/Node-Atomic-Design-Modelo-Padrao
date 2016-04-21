'use strict';

module.exports = (QuarkName) => {
  return {
    validator: require('./../quarks/'+QuarkName)
  , message: require('./../quarks/'+QuarkName+'Message')
  }
};