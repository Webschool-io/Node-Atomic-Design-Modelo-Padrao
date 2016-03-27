'use strict';

const mongoose = require('mongoose');
const Molecule = require('./../molecules/alunoCurso');
const Organism = mongoose.model('Aluno', Molecule);

const create = require('./organelles/create')(Organism);
const find = require('./organelles/find')(Organism);
const findOne = require('./organelles/findOne')(Organism);
const update = require('./organelles/update')(Organism);
const remove = require('./organelles/remove')(Organism);

const Cell = {
  create
, find
, findOne
, update
, remove
};

module.exports = Cell;