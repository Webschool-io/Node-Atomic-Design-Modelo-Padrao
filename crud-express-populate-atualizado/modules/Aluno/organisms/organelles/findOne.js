'use strict';

module.exports = (Organism) => {
  return (obj, callback) => {
    const arr = require('../../../helpers/prepareDocMongoose')(Organism);
    const Refs = require('../../../helpers/findRefMongoose')(arr);
    const Populate = require('../../../helpers/runPopulateMongoose');
    console.log('Refs', Refs)
    Organism.findOne(obj).lean().exec( (err, data) => {
      if(err) return console.log('ERRO', err);
      console.log('data', data)
      if(Object.keys(Refs).length) return Populate.run(data, Refs, callback);
    });
  }
};

