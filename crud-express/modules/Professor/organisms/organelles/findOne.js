'use strict';

module.exports = (Organism) => {
  return (obj, callback) => Organism.findOne(obj, callback);
};

