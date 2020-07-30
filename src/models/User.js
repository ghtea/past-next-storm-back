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
  
  , email: { type: String }
  , passwordHashed: String // 비밀번호를 해싱해서 저장합니다
  
  , battletagPending: String
  , battletagConfirmed: String
  
  , joined: { type: Date, default: Date.now }
  , accessed: { type: Date, default: Date.now }

  
  //, thoughtCount: { type: Number, default: 0 } // 서비스에서 포스트를 작성 할 때마다 1씩 올라갑니다
  
    
}, { collection: 'Users', versionKey: false} );



/*
User.statics.findByUsername = function(username) {
    // 객체에 내장되어있는 값을 사용 할 때는 객체명.키 이런식으로 쿼리하면 됩니다
    return this.findOne({'username': username}).exec();
};
*/
/*
User.statics.findByEmail = function(email) {
    return this.findOne({email}).exec();
};

User.statics.findByEmail = function(email) {
    return this.findOne({email}).exec();
};
*/
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
  
  /*
    _id: uuid()
    , email: inputEmail1.value
    , password: inputPassword1.value
    , battletagPending: inputBattletagPending.value
  */
  
  const mongoUser = new this({
      _id: payload._id
    
      , email: payload.email
      , passwordHashed: hash(payload.password)
      
      , battletagPending: payload.battletagPending
  });
 
    return mongoUser.save();  //약간 의문이 들지만 우선 다음에 살펴보자
    
};


User.methods.validatePassword = function(passwordTrying) {
    // 함수로 전달받은 password 의 해시값과, 데이터에 담겨있는 해시값과 비교를 합니다.
    const passwordTryingHashed = hash(passwordTrying);
    return this.passwordHashed === passwordTryingHashed;
};



User.methods.generateToken = function() {
  
    // JWT 에 담을 내용
    const payload = {
      _id: this._id,
      email: this.email
    };

    return generateToken(payload, 'User');  // 'User' 는 그냥 구분용으로 ?
};





module.exports = mongoose.model('User', User);