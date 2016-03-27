'use strict';

module.exports = (Organism) => {
  return (obj, callback) => Organism.remove(obj, callback);
};

