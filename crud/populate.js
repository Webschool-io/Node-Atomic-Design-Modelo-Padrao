const mongoose = require('mongoose')
  , Schema = mongoose.Schema
const dbURI = 'mongodb://localhost/testes';

mongoose.connect(dbURI);

var personSchema = Schema({
  _id     : Number,
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  _creator : { type: Number, ref: 'Person' },
  title    : String,
  fans     : [{ type: Number, ref: 'Person' }]
});

var Story  = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);

// var aaron = new Person({ _id: 666, name: 'Aaron', age: 100 });

// aaron.save(function (err, data) {
//   if (err) return console.log(err);
  
//   var story1 = new Story({
//     title: "Once upon a timex.",
//     _creator: data._id    // assign the _id from the person
//   });
  
//   story1.save(function (err, data) {
//     if (err) return console.log(err);
//     console.log('story1', data)
//   });
// });

Story
.findOne({ title: 'Once upon a timex.' })
.populate('_creator')
.exec(function (err, story) {
  if (err) return console.log(err);
  console.log('The creator is %s', story._creator.name);
  // prints "The creator is Aaron"
});