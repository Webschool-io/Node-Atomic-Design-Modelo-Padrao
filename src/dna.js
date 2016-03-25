'use strict';

const DNA = {
  name: 'User'
, organelles: ['findByName', 'findByEmail']
, molecules: ['aluno', 'user']
}

const Cell = require('./GOD')(DNA);
console.log('Cell', Cell);