const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Molecule = {
  user_id: require('./../atoms/userRef')(Schema)
, name: require('./../atoms/name')
// , dateBirth: require('./../atoms/dateBirth')
, disciplinas: [ require('./../atoms/cursoRef')(Schema) ]
}

module.exports = new Schema(Molecule);