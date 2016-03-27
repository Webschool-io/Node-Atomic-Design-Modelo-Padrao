'use strict';

module.exports = (Organism) => {

  const callbackExpress = require('./organisms/organelles/callbackExpress');

  return (req, res) => {
    let obj = req.body;
    Organism.create(obj, (err, data) => {
      callbackExpress(err, data, res);
    });
  };
};