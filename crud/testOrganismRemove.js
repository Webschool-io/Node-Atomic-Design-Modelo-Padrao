'use strict';

require('./config/db');
const Organism = require('./organisms/user');
const query = {_id: '56f75f7bc7a357337142a293'}
const callback = require('./organisms/organelles/callbackRemove');

Organism.remove(query, callback);

