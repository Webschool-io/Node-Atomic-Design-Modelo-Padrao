const AtomStructure = {
  type: String
, get: 'toUpper'
, set: 'toLower'
, validate: 'nameMongooseValidate' // é um hadron
, required: true
}

module.exports = AtomStructure;