const Atom = {
  type: String
, get: require('./../quarks/toUpper')
, set: require('./../quarks/toLower')
}

module.exports = Atom;