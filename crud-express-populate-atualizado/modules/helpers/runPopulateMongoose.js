'use strict';

const mongoose = require('mongoose');
// const populate = require('./populateMongoose');

const populate = {
  run: (model, query, populateObj, Refs, index) => {
    let doc = populateObj.base;
    // let query = query;
    if(Array.isArray(query._id)) {
      console.log('query_id', query._id)
      query._id.forEach( function(element, index) {
        let q = {_id: element}
        model
          .findOne(q)
          .lean()
          .exec( (err, data) => {
            console.log('query', q)
            console.log('findOne(query)', data)
            if(!index) doc[populateObj.path] = [];

            doc[populateObj.path].push(data);
            if(index === Refs.length - 1) {
              populateObj.cb(err, doc);
            }
            // else {
            //   console.log('chama os outros populates')
            // }
            console.log('doc['+populateObj.ref+']', doc[populateObj.ref])
            console.log('doc[populateObj.ref]', doc)
          });
      });
    }
    else {
      //  Referencia unica tipo users_id
      model
        .findOne(query)
        .lean()
        .exec( (err, data) => {
          let name = populateObj.path.split('_id')[0];
          delete doc[populateObj.path];
          doc[name] = data;
          if(index === Refs.length - 1) {
            populateObj.cb(err, doc);
          }
          else {
            console.log('chama os outros populates')
          }
        });
    }
  }
}

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