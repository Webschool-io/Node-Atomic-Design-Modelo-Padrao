'use strict';

require('./config/db');
const Organism = require('./organisms/user');
const callback = require('./organisms/organelles/callback');
const obj = {
  email: 'suissa@webshool.io'
, password: 'Bazingueiro666'
}

Organism.create(obj, callback);

