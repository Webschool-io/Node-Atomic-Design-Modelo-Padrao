'use strict';
module.exports = (Organism) => {
  let _paths = Organism.schema.paths;
  return Object.keys(_paths).map( (key) => _paths[key]);
};
