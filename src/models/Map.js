var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var schemaMap = new Schema({
  _id: Number
  ,name: String
  
  ,shortName: String
  
  ,lines: Number
  ,type: String
  ,rankedRotation: Boolean
  ,playable: Boolean
  
}, { collection: 'collMap', versionKey: false});



module.exports = mongoose.model('Map', schemaMap);