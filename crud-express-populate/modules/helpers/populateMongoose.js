'use strict';
module.exports = {
  
  run: (model, query, populateObj) => {
    let doc = populateObj.base;
    model
      .findOne(query)
      .lean()
      .exec( (err, data) => {
        doc[populateObj.ref] = data;
        populateObj.cb(err, doc);
      });
  }
};