'use strict';

module.exports = (Organism) => {

  const callbackExpress = require('./callbackExpress');

  return (req, res) => {
    // console.log('req.params', req.params)
    // let query = { _id: req.params.id };
    // let mod = req.body;
    // let options = { runValidators: true };

    // Organism.update(query, mod, options, (err, data) => {
    //   callbackExpress(err, data, res);
    // });
  };
};