'use strict';

module.exports = (Organism) => {
  return (obj, callback) => Organism.create(obj, callback);
};

