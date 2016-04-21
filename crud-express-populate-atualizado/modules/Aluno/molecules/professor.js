const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Curso = require('./curso');

const Molecule = {
  name: require('./../atoms/name')
, dateBegin: require('./../atoms/dateBegin')
, cursos: [Curso]
}

module.exports = new Schema(Molecule);