var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schemaRating = new Schema({
  _id: String
  , up: Number
  , down: Number
  
  , upMaster: Number
  , downMaster: Number
});


var schemaPosition = new Schema({
  _id: String
  ,index: Number
  ,explanation: String
  ,listIdHero: [String]
});



var schemaComment = new Schema({
  _id: String
  ,author: String
  
  , language: String
  , content: String
  
  , rating: schemaRating
});


var schemaLink= new Schema({
  _id: String
  , author: String
  
  , type: String // "video", "guide"
  , content: String
  
  , rating: schemaRating
});




var schemaComp = new Schema({
  _id: String
  ,author: String
  
  ,title: String
  
  ,created: Date
  ,updated: Date
  ,version: String
  
  ,listPosition:[schemaPosition]
  ,listMap: [String]
  ,listTag: [String]
  
  ,listComment: [schemaComment]
  ,listLink: [schemaLink]
  
  ,rating: schemaRating
  
}, { collection: 'Comp_', versionKey: false, strict: false});



module.exports = mongoose.model('Comp', schemaComp);