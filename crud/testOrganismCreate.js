'use strict';

require('./config/db');
const Organism = require('./organisms/aluno');
const callback = require('./organisms/organelles/callback');
const obj = {
  user_id: '56f760cb94e41479715ff29f'
, name: 'Suissa Aluno'
, dateBirth: Date('1984/11/20')
, cursos: ['56f76ee8053c543373ad29ef']
}

Organism.create(obj, callback);