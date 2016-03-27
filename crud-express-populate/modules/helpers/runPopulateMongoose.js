'use strict';

const mongoose = require('mongoose');
const populate = require('./populateMongoose');

module.exports = {
  run: (data, Refs, cb) => {
    const query = { _id: data[Refs.path] };
    const populateObj = {base: data, ref: Refs.ref, path: Refs.path, cb: cb};
    let nameSingular = Refs.ref.slice(0, Refs.ref.length - 1);
    let modelName = nameSingular.charAt(0).toUpperCase() + nameSingular.slice(1);
    populate.run(mongoose.model(modelName), query, populateObj);
  }
};