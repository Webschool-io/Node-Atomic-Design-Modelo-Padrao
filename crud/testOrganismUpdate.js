'use strict';

require('./config/db');
const Organism = require('./organisms/aluno');
const query = {_id: '56f7786a8a5dfec973fcf378'}
const mod = {name: 'Suissa ALUNO SAPECA'}
const options = {};
const callback = require('./organisms/organelles/callback');

Organism.update(query, mod, options, callback);

