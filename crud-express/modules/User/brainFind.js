'use strict';

module.exports = (Organism) => {

  const callbackExpress = require('./organisms/organelles/callbackExpress');

  return (req, res) => {
    let obj = req.body;

    Organism.find(obj, (err, data) => {
      callbackExpress(err, data, res);
    });
  };
};