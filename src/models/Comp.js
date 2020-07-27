var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var schemaPosition = new Schema({
  _id: String
  ,index: Number
  ,explanation: String
  ,listIdHero: [String]
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
  
  , language: String
  ,content: String
  ,link: String
  ,rating: schemaCommentRating
});




var schemaComp = new Schema({
  _id: String
  ,password: String
  
  ,title: String
  //,author: String
  
  ,created: Date
  ,updated: Date
  ,version: String
  
  ,listPosition:[schemaPosition]
  ,listMap: [String]
  ,listTag: [String]
  
  
  ,rating: schemaRating
  ,listComment: [schemaComment]
  
}, { collection: 'collComp', versionKey: false});



module.exports = mongoose.model('Comp', schemaComp);