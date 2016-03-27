'use strict';

const mongoose = require('mongoose');
const populate = require('./populateMongoose');

module.exports = {
  run: (data, Refs, cb) => {
    const query = { _id: data[Refs.path] };
    const populateObj = {base: data, ref: Refs.ref, path: Refs.path, cb: cb};

    populate.run(mongoose.model('User'), query, populateObj);
  }
};