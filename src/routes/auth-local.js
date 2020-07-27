import express from 'express';
import Joi from 'joi';

import User from '../models/User';

var router = express.Router();

// 진행중 https://backend-intro.vlpt.us/3/04.html



// https://devlog-h.tistory.com/13  koa vs express
router.post('/register', async (req, res, next) => {
  
  try {
    
    // 검증의 방법/형태
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(4).max(15).required()
        ,email: Joi.string().email().required()
        ,password: Joi.string().required().min(6)
    });

    const result = schema.validate(req.body); // 여기서 검증

    // 스키마 검증 실패
    if(result.error) {
      res.status(400).send("validate catched something")
      console.log("validate catched something")
      return;
    }
    

    // 아이디 / 이메일 중복 체크
    let existing = null;
    try {
        existing = await User.findByEmailOrUsername(req.body);
    } catch (error) {
      console.log(error);
      res.status(500).send()
    }

    if(existing) {
    // 중복되는 아이디/이메일이 있을 경우
      console.log("id or email is duplicate")
      res.status(409).send('duplicate');
      return; // https://velog.io/@kim-macbook/Cannot-set-headers-after-they-are-sent-to-the-client
        //res.status = 409; // Conflict
        // 어떤 값이 중복되었는지 알려줍니다
        //console.log("duplicate")
        //res.send("email or username is duplicate")
        /*
        res.json = {
            key: (existing.email === req.body.email) ? 'email' : 'username'
        };
        */
        //res.send("duplicate");
    }



    // 계정 생성
    let tUser = null;
    try {
      tUser = await User.registerLocal(req.body);
      res.send(tUser.username);
    } catch (error) {
      console.log(error);
    }


  } catch(error) { next(error) }
  
});





router.post('/login', async (req, res, next) => {
  
  try {
    
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    
    const result = schema.validate(req.body); // 여기서 검증

    if(result.error) {
      res.status(400).send("validate catched something")
      return;
    }
    
    
    const { email, password } = req.body; 

    let tUser = null;
    try {
        // 이메일로 계정 찾기
        tUser = await User.findByEmail(email);
    } catch (e) {
        res.status(500).send(e);
    }

    if(!tUser || !tUser.validatePassword(password)) {
    // 유저가 존재하지 않거나 || 비밀번호가 일치하지 않으면
        res.status(403).send("no user by this email or wrong password")
        return;
    }

    res.json(tUser.username);
    
    
  } catch(error) { next(error) }
  
});


// 3번째 API exists 에서는 :key(email|username) 이 사용되었는데, 이 의미는 key 라는 파라미터를 설정하는데, 이 값들이 email 이나 username 일때만 허용한다는 것 입니다.
router.post('/exists/:key(email|username)/:value', async (req, res, next) => {
  
  try {
    
    
    
  } catch(error) { next(error) }
  
});

router.post('/logout', async (req, res, next) => {
  
  try {
    
    
    
  } catch(error) { next(error) }
  
});


module.exports = router;




