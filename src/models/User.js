const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const dotenv = require('dotenv');

const hash = (password) => {
  return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const User = new Schema({
	
  username: String
  , passwordHashed: String // 로컬계정의 경우엔 비밀번호를 해싱해서 저장합니다

  , email: { type: String }
  
  // 소셜 계정으로 회원가입을 할 경우에는 각 서비스에서 제공되는 id 와 accessToken 을 저장합니다
  , social: {
      facebook: {
          id: String,
          accessToken: String
      }
      
      , google: {
          id: String,
          accessToken: String
      }
  }
  
  //, thoughtCount: { type: Number, default: 0 } // 서비스에서 포스트를 작성 할 때마다 1씩 올라갑니다
  , created: { type: Date, default: Date.now }
    
}, { collection: 'collUser', versionKey: false});




User.statics.findByUsername = function(username) {
    // 객체에 내장되어있는 값을 사용 할 때는 객체명.키 이런식으로 쿼리하면 됩니다
    return this.findOne({'username': username}).exec();
};

User.statics.findByEmail = function(email) {
    return this.findOne({email}).exec();
};

User.statics.findByEmailOrUsername = function({username, email}) {
    return this.findOne({
        // $or 연산자를 통해 둘중에 하나를 만족하는 데이터를 찾습니다
        $or: [
            { 'username': username },
            { email }
        ]
    }).exec();
};

//username, email, password
// this 를 사용하려면 화살표 함수는 X 인듯?
User.statics.registerLocal = async function ({ username, email, password }) {
    // 데이터를 생성 할 때는 new this() 를 사용합니다.
    const tUser = new this({
        username
        ,passwordHashed: hash(password)
        , email
    });

    return await tUser.save();
};


User.methods.validatePassword = function(passwordTrying) {
    // 함수로 전달받은 password 의 해시값과, 데이터에 담겨있는 해시값과 비교를 합니다.
    const passwordHashedTrying = hash(passwordTrying);
    return this.passwordHashed === passwordHashedTrying;
};









module.exports = mongoose.model('User', User);