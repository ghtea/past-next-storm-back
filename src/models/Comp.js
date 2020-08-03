const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { v4: uuidv4 } = require('uuid');
// https://www.npmjs.com/package/uuid



var schemaPosition = new Schema({
  _id: String
  ,index: Number
  ,explanation: String
  ,listIdHero: [String]
});



var schemaComp = new Schema({
  _id: { type: String, default: uuidv4() }
  ,author: String
  
  ,title: String
  
  ,listPosition:[schemaPosition]
  ,listMap: [String]
  ,listTag: [String]
  
  ,listComment: [String]  // list of _id (Comment)
  ,listLink: [String] // list of _id (Link)
  
  ,listLike: [String] // 마스터들은 별도로 콜랙션 만들기! (like 명단에 자신 배틀태그 공개할 지 설정)
  
  ,created: Date
  ,updated: Date
  ,version: String
  
}, { collection: 'Comp_', versionKey: false, strict: false});



module.exports = mongoose.model('Comp', schemaComp);