'use strict';

require('./config/db');
const Organism = require('./organisms/curso');
const callback = require('./organisms/organelles/callback');
const obj = {
  name: 'JS Funcional'
, dateBegin: Date('2016/05/20')
, link: 'https://github.com/Webschool-io/workshop-js-funcional-free'
}

Organism.create(obj, callback);

