const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { v4: uuidv4 } = require('uuid');




var schemaMap = new Schema({
  _id: { type: String, default: uuidv4() }
  ,name: String
  
  ,shortName: String
  
  ,lines: Number
  ,type: String
  ,rankedRotation: Boolean
  ,playable: Boolean
  
}, { collection: 'Map_', versionKey: false, strict: false});



module.exports = mongoose.model('Map', schemaMap);