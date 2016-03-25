'use strict';

const mongoose = require('mongoose');
const moleculesPath = './molecules/';
const organellesPath = './organelles/';

module.exports = (DNA) => {
  const OrganismName = DNA.name;
  const Molecule = require('./REACTIONS')(DNA);
  const Organism = mongoose.model(OrganismName, Molecule);

  let Cell = {};
  const Organelles = ['create', 'find', 'findOne', 'update', 'remove'];

  DNA.organelles.forEach((element, index) => Organelles.push(element))

  const createOrganelles = (element, index) => {
    Cell[element] =  require(organellesPath+element)(Organism);
    // console.log(element, Cell[element]);
  };

  Organelles.forEach(createOrganelles);
  return Cell;
};

