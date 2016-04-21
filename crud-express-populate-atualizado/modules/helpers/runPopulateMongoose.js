'use strict';

const mongoose = require('mongoose');
const populate = require('./populateMongoose');

// const populate = 

module.exports = {
  run: (data, Refs, cb) => {
    Refs.forEach( function(element, index) {
      console.log('Ref '+index, element)
      let query = { _id: data[element.path] };
      let populateObj = {base: data, ref: element.ref, path: element.path, cb: cb};
      let nameSingular = element.ref.slice(0, element.ref.length - 1);
      let modelName = nameSingular.charAt(0).toUpperCase() + nameSingular.slice(1);
      populate.run(mongoose.model(modelName), query, populateObj, Refs, index);
    });

  }
};