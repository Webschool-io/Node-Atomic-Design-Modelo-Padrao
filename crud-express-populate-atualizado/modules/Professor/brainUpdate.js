'use strict';

module.exports = (Organism) => {

  const callbackExpress = require('./organisms/organelles/callbackExpress');

  return (req, res) => {
    let query = { _id: req.params.id };
    let mod = req.body;
    let options = { runValidators: true };

    Organism.update(query, mod, options, (err, data) => {
      callbackExpress(err, data, res);
    });
  };
};