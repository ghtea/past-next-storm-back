var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var schemaPosition = new Schema({
  _id: String
  ,listHero: [String]
});


//
var schemaRatingNumber = new Schema({
  _id: String
  , up: Number
  , down: Number
});


var schemaRating = new Schema({
  _id: String
  ,anybody: schemaRatingNumber
  ,master: schemaRatingNumber
});




//
var schemaCommentRating = new Schema({
  _id: String
  , up: Number
  , down: Number
});

var schemaComment = new Schema({
  _id: String
  ,author: String
  ,content: String
  ,rating: schemaCommentRating
});




var schemaComp = new Schema({
  _id: String
  ,password: String
  
  
  
  ,title: String
  ,author: String
  
  ,added: Date
  ,links: [String]
  ,tags: [String]
  
  ,listPosition:[schemaPosition]
  
  ,rating: schemaRating
  ,comments: [schemaComment]
  
}, { collection: 'cComp', versionKey: false});



module.exports = mongoose.model('Comp', schemaComp);