'use strict';

const express = require('express');
const router = express.Router();
const Organism = require('./organisms/aluno');
const Create = require('./brainCreate')(Organism);
const Find = require('./brainFind')(Organism);
const FindOne = require('./brainFindOne')(Organism);
// const Update = require('./brainUpdate')(Organism);
const Remove = require('./brainRemove')(Organism);


const callbackExpress = require('./organisms/organelles/callbackExpress');
router.get('/', Find);
router.get('/:id', FindOne);
router.post('/', Create);
// router.put('/:id', Update);
router.put('/:id', (req, res) => {
  console.log('PUT')
  let query = { _id: req.params.id };
  let mod = req.body;
  let options = { runValidators: true };

  Organism.update(query, mod, options, (err, data) => {
    callbackExpress(err, data, res);
  });
});
router.delete('/:id', Remove);

module.exports = router;