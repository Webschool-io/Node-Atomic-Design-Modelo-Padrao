const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Molecule = {
  name: require('./../atoms/name')
, schoolName: require('./../atoms/schoolName')
, cursos: [ require('./../atoms/cursoRef')(Schema) ]
}

module.exports = new Schema(Molecule);