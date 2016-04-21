'use strict';

require('./config/db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MoleculeName = 'User';
const Molecule = require('./molecules/'+MoleculeName.toLowerCase());

const Organism = mongoose.model(MoleculeName, Molecule);

// const query = { _id: '56f75e0c822a32b4704567bf' };


// const cb = (err, data) => {
//   if(err) console.log('ERRO:', err);
//   else console.log('RETORNo:', data);
// };

// Organism.update(query, {email: ''}, cb);


// const populateAluno = (err, data) => {
//   console.log('populateAluno')
//   if(err) console.log('ERRO:', err);
//   else {
//     Aluno.cursos[0] = data;
//   };
//   console.log('Aluno', Aluno);
// };
// const populate = (err, data) => {
//   console.log('populate')
//   Aluno = data;
//   if(err) console.log('ERRO:', err);
//   else {
//     let query = { _id: data.cursos[0] };
//     OrganismCurso.findOne(query, populateAluno)
//   }
// };

// Organism.findOne(query, populate);

const DNA = {
  email: 'Suissa@ehnois.com'
, password: '1234'
};
const Cell = new Organism(DNA);
console.log('Cell', Cell);

Cell.save((err, data) => {
  if(err) console.log('ERRO:', err);
  else console.log('RETORNO', data);
})

// const DNA = {
//   name: 'Suissa'
// , dateBirth: new Date('1984/11/20')
// , cursos: ['56f73fdf62f069836b539673']
// };
// const Cell = new Organism(DNA);
// console.log('Cell', Cell);

// Cell.save((err, data) => {
//   if(err) console.log('ERRO:', err);
//   else console.log('RETORNO', data);
// })
