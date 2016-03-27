'use strict';

const express = require('express');
const router = express.Router();
const Organism = require('./organisms/user');
const callback = require('./brain')(Organism);

router.get('/', callback);
// router.get('/:id', (req, res) => {
  
// });

// router.post('/', (req, res) => {
  
// });

// router.put('/:id', (req, res) => {
  
// });

// router.delete('/:id', (req, res) => {
  
// });
module.exports = router;