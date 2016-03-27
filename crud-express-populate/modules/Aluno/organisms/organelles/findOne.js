'use strict';
const mongoose = require('mongoose');

let Aluno = {};
const populate = (data, user, cb) => {
  Aluno = data;
  console.log('Aluno', Aluno)
  Aluno['user'] = user;
  console.log('Aluno user', Aluno)
  cb(Aluno);
};

module.exports = (Organism) => {
  return (obj, callback) => {
    Organism.findOne(obj).lean().exec( (err, data) => {
      if(err) return console.log('ERRO', err);
      console.log('Aluno data', data)
      Aluno = data;
      const query = { _id: data.user_id };
      mongoose.model('User').findOne(query).lean().exec( (err, user) => {
        console.log('user', user)
        console.log('Aluno', Aluno)
        Aluno['user_id'] = user;
        callback(err, Aluno);
        // populate(data, user, (populated) => console.log('populated', populated));
      });
    });
  }
};

