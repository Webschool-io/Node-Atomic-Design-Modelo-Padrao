'use strict';

require('./config/db');
const Organism = require('./organisms/aluno');
const callback = require('./organisms/organelles/callback');
const query = {_id: '56f7786a8a5dfec973fcf378'}

Organism.findOne(query, callback);