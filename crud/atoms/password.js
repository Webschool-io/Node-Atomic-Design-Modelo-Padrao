module.exports = {
  type: String
, validate: require('./../hadrons/ValidateMongoose')('isPassword')
, required: true
}