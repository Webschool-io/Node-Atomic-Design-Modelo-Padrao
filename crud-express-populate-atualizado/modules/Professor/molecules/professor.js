const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Curso = require('./curso');

const Molecule = {
  name: require('./../atoms/name')
, schoolName: require('./../atoms/schoolName')
, cursos: [Curso]
}

module.exports = new Schema(Molecule);