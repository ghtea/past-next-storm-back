const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { v4: uuidv4 } = require('uuid');


var schemaLink= new Schema({
  _id: { type: String, default: uuidv4() }
  , subject: { _id:String, model:String} // where this link belong to, ex:  "dfdfhefef-fdfd" , "Comp"
  
  , author: String
  
  , type: String // "video", "guide", "image(screenshot)", ...
  , content: String // "link"
  
  , listLike: [String] 
  
  ,created: Date
  ,updated: Date
  
}, { collection: 'Link_', versionKey: false, strict: false});


module.exports = mongoose.model('Link', schemaLink);