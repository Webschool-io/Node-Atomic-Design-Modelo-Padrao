'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moleculesPath = './molecules/';

module.exports = (DNA) => {

  const absorver = (MoleculeReceive, MoleculeIn, name) => {
    MoleculeReceive[name] = MoleculeIn;
    return MoleculeReceive;
  };

  let Molecules = [];

  DNA.molecules.forEach((element, index) => {
    Molecules[element] = require(moleculesPath+element);
  });

  const Molecule = absorver(Molecules['aluno'], Molecules['user'], 'user');
  return new Schema(Molecule);
};



