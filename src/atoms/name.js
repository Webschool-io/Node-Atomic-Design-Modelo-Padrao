'use strict';

const QuarksPath = './../quarks/';
const HadronsPath = './../hadrons/';
const Structure = require('./nameStructure');

let Atom = Structure;

// Por hora só usamos Quarks no get, set e Hadron no validate
const Quarks = ['get', 'set'];
const Hadrons = ['validate'];

const confineQuarks = (element, index) => Atom[element] = require(QuarksPath+Structure[element]);
const confineHadrons = (element, index) => Atom[element] = require(HadronsPath+Structure[element]);

Quarks.forEach(confineQuarks);
Hadrons.forEach(confineHadrons);

module.exports = Atom;