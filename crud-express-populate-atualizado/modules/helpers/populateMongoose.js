'use strict';
module.exports = {
  run: (model, query, populateObj) => {
    let doc = populateObj.base;
    model
      .findOne(query)
      .lean()
      .exec( (err, data) => {
        console.log('query', query)
        console.log('findOne(query)', data)
        doc[populateObj.ref] = data;
        populateObj.cb(err, doc);
        console.log('doc['+populateObj.ref+']', doc[populateObj.ref])
        console.log('doc[populateObj.ref]', doc)
      });
  }
};