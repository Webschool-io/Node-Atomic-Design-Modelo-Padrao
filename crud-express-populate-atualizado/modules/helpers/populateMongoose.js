// 'use strict';
// module.exports = {
//   run: (model, query, populateObj) => {
//     let doc = populateObj.base;
//     model
//       .findOne(query)
//       .lean()
//       .exec( (err, data) => {
//         console.log('query', query)
//         console.log('findOne(query)', data)
//         doc[populateObj.ref] = data;
//         populateObj.cb(err, doc);
//         console.log('doc['+populateObj.ref+']', doc[populateObj.ref])
//         console.log('doc[populateObj.ref]', doc)
//       });
//   }
// };
'use strict';
module.exports = {
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