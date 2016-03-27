'use strict';

module.exports = (Organism) => {
  return (obj, mod, options, callback) => Organism.update(obj, mod, options, callback);
};

