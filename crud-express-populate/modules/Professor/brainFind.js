'use strict';

module.exports = (Organism) => {

  const callbackExpress = require('./organisms/organelles/callbackExpress');

  return (req, res) => {

    Organism.find({}, (err, data) => {
      callbackExpress(err, data, res);
    });
  };
};