'use strict';

module.exports = {
  run: (model, query, populateObj, Refs, index) => {

    let doc = populateObj.base;

    const refObjectId = (err, data) => {
      let name = populateObj.path.split('_id')[0];
      // deleto o campo user_id
      delete doc[populateObj.path];
      // e adiciono o campo user
      doc[name] = data;
      if(index === Refs.length - 1) populateObj.cb(err, doc);
    }

    const refArrayObjectId = (element, index) => {
      let q = {_id: element}
      model
        .findOne(q)
        .lean()
        .exec( (err, data) => {
          // caso seja a primeira iteração
          // limpamos o Array
          if(!index) doc[populateObj.path] = [];

          doc[populateObj.path].push(data);
          if(index === Refs.length - 1) {
            populateObj.cb(err, doc);
          }
        });
    }

    if(Array.isArray(query._id)) query._id.forEach(refArrayObjectId);
    else model.findOne(query).lean().exec(refObjectId);
  }
}