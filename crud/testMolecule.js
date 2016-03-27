'use strict';

require('./config/db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MoleculeName = 'Aluno';
const Molecule = require('./molecules/'+MoleculeName.toLowerCase()+'Curso');

const Organism = mongoose.model(MoleculeName, Molecule);

const CursoSchema = {
  name: require('./atoms/name')
, dateBegin: require('./atoms/dateBegin')
, link: require('./atoms/link')
}

const Curso = new Schema(CursoSchema);
const CursoModel = mongoose.model('Curso',Curso);

// const Curso = require('./molecules/curso');
// const OrganismCurso = mongoose.model('Curso', Curso);

let Aluno = {};
const query = { _id: '56f749f4428681046d7c1d5c' };


// const cb = (err, data) => {
//   if(err) console.log('ERRO:', err);
//   else console.log('RETORNo:', data);
// };

// Organism.findOne({}).populate('cursos').exec(cb);


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
