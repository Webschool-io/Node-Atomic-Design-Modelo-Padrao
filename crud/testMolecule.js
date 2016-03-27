require('./config/db');
const mongoose = require('mongoose');
const MoleculeName = 'Aluno';
const Molecule = require('./molecules/'+MoleculeName.toLowerCase()+'Curso');

const Organism = mongoose.model(MoleculeName, Molecule);

//   console.log('find')
// Organism.find({}, (err, data) => {
//   console.log('find')
//   if(err) console.log('ERRO:', err);
//   else console.log('RETORNO', data);
// });

// const query = { _id: '56f745090f26d9066ccf84af' };
// const cb = (err, data) => {
//   console.log('callbacks')
//   if(err) console.log('ERRO:', err);
//   else console.log('RETORNO', data);
// };
// Organism.findOne({})
// // .populate('cursos')
// .exec(cb);

const DNA = {
  name: 'Suissa'
, dateBirth: new Date('1984/11/20')
, cursos: ['56f73fdf62f069836b539673']
};
const Cell = new Organism(DNA);
console.log('Cell', Cell);

Cell.save((err, data) => {
  if(err) console.log('ERRO:', err);
  else console.log('RETORNO', data);
})
