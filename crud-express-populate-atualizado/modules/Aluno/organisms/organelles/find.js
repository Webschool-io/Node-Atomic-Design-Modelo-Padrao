'use strict';

module.exports = (Organism) => {
  return (obj, callback) => Organism.find(obj, callback);
};

