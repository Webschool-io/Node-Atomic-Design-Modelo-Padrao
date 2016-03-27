'use strict';

require('./config/db');
const Organism = require('./organisms/aluno');
const query = {_id: '56f76d35c949c9137395d49a'}
const callback = require('./organisms/organelles/callbackRemove');

Organism.remove(query, callback);

