'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let UserMolecule = require('./molecules/user');
let AlunoMolecule = require('./molecules/aluno');

const absorver = (MoleculeReceive, MoleculeIn, name) => {
  MoleculeReceive[name] = MoleculeIn;
  return MoleculeReceive;
};

AlunoMolecule = absorver(AlunoMolecule, UserMolecule, 'user');
// console.log('AlunoMolecule', AlunoMolecule);
module.exports = new Schema(AlunoMolecule);
