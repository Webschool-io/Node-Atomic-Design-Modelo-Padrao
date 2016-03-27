const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Molecule = {
  name: require('./../atoms/name')
, dateBirth: require('./../atoms/dateBirth')
, cursos: [ require('./../atoms/cursoRef')(Schema) ]
}

module.exports = new Schema(Molecule);