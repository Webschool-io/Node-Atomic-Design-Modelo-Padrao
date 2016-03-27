'use strict';
const mongoose = require('mongoose');

module.exports = (Organism) => {
  return (obj, callback) => {

    const populate = (model, query, base, toPopulate, cb) => {
      model
        .findOne(query)
        .lean()
        .exec( (err, data) => {
          base[toPopulate] = data;
          callback(err, base);
        });
    };

    Organism.findOne(obj).lean().exec( (err, data) => {
      if(err) return console.log('ERRO', err);

      const query = { _id: data.user_id };
      populate(mongoose.model('User'), query, data, 'user', callback);
    });
  }
};

