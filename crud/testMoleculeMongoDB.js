require('./config/db');
const mongoose = require('mongoose');
const MoleculeName = 'Curso';
const Molecule = require('./molecules/'+MoleculeName.toLowerCase());

const Organism = mongoose.model(MoleculeName, Molecule);

const DNA = {
  name: 'Suissa'
, dateBegin: new Date('2016/06/20')
, link: 'https://github.com/Webschool-io/be-mean-instagram'
};
const Cell = new Organism(DNA);
console.log('Cell', Cell);

Cell.save((err, data) => {
  if(err) console.log('ERRO:', err);
  else console.log('RETORNO', data);
})
