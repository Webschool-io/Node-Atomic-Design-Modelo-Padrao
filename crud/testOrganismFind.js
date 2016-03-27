'use strict';

require('./config/db');
const Organism = require('./organisms/user');
const callback = require('./organisms/organelles/callback');
const query = {_id: '56f75f7bc7a357337142a293'}

Organism.findOne(query, callback);

