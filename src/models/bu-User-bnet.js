const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const dotenv = require('dotenv');

const { generateToken } = require('../works/auth/token');


const hash = (password) => {
  return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const User = new Schema({
	
  //username: String
  _id: String
  
  , battletag: String
  
  //, email: { type: String }
  //, passwordHashed: String // 비밀번호를 해싱해서 저장합니다
  
  , created: { type: Date, default: Date.now }
  

}, { collection: 'collUser', versionKey: false});



User.statics.findByBattletag = function(battletag) {
    return this.findOne({battletag}).exec();
};

/*
User.statics.findByEmailOrUsername = function({username, email}) {
    return this.findOne({
        // $or 연산자를 통해 둘중에 하나를 만족하는 데이터를 찾습니다
        $or: [
            { 'username': username },
            { email }
        ]
    }).exec();
};
*/

//username, email, password
// this 를 사용하려면 화살표 함수는 X 인듯?
User.statics.register = async function ( payload ) {
  // 데이터를 생성 할 때는 new this() 를 사용합니다.
  const tUser = new this({
      _id: payload._id
      , battletag: payload.battletag
      //, email: payload.email
      //, passwordHashed: hash(payload.password)
  });
 
    return tUser.save();
    
};

/*
User.methods.validatePassword = function(passwordTrying) {
    // 함수로 전달받은 password 의 해시값과, 데이터에 담겨있는 해시값과 비교를 합니다.
    const passwordTryingHashed = hash(passwordTrying);
    return this.passwordHashed === passwordTryingHashed;
};
*/


User.methods.generateToken = function() {
  
    // JWT 에 담을 내용
    const payload = {
        _id: this._id,
        battletag: this.battletag
    };

    return generateToken(payload, 'User');  // 'User' 는 그냥 구분용으로 ?
};





module.exports = mongoose.model('User', User);