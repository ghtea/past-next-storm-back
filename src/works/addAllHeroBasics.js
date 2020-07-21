
// have not test here yet

import mongoose from 'mongoose';
import dotenv from "dotenv"
import axios from 'axios'


let HeroBasic = require('../models/HeroBasic');

dotenv.config({ 
  path: './.env' 
});



// mongo db 와 연결
mongoose
.connect(process.env.DB_URL, {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(`DB Connection Error: ${err.message}`);
});



// thelostvikings => lostvikings, thebutcher => butcher
const from_short_name_HeroesProfile_to_key_HeroesTalents = (short_name_HeroesProfile) => {
  
  let key_HeroesTalents;
  
  switch (short_name_HeroesProfile){
    case "thelostvikings" :
    key_HeroesTalents = "lostvikings";
    break;
   case "cho" :
    key_HeroesTalents = "chogall";
    break;
    
    default :
    key_HeroesTalents = short_name_HeroesProfile;
  }
    return key_HeroesTalents
}


// HeroesTalents 에서 각 영웅별 tags 가져오기
// "tags": [ "Ganker","Helper","InstantTraveler","RoleSpecialist","TowerPusher","WaveClearer"],
const return_tags_each_hero = async (key_HeroesTalents) => {
  
  const res_HeroesTalents = await axios.get(`https://heroes-talents.avantwing.com/hero/${key_HeroesTalents}.json`);

  const objHero_HeroesTalents = res_HeroesTalents.data;
  
  
  
  const tags = objHero_HeroesTalents['tags']
  
  //const tags = Object.keys(tagsOriginal)
  
  return tags;

}

  

const addAllHeroBasics = async () => {
  
  try {
    const res_HeroesProfile = await axios.get(`https://api.heroesprofile.com/api/Heroes?mode=json&api_token=${process.env.TOKEN_HP}`)
    const objHeroes_HeroesProfile = res_HeroesProfile.data;
    
    const list_key_HeroesProfile = Object.keys(objHeroes_HeroesProfile); // name 이자 key_HeroesProfile 이자 _id
   
    //let listHeroBasic = new Array(list_key_HeroesProfile.length);
    
    
    
    for (const key_HeroesProfile of list_key_HeroesProfile) {
      
      const short_name_HeroesProfile = objHeroes_HeroesProfile[key_HeroesProfile]["short_name"];
      const key_HeroesTalents = from_short_name_HeroesProfile_to_key_HeroesTalents(short_name_HeroesProfile);
      
      let tHeroBasic = {
        
        _id: key_HeroesProfile
    
        ,key_HeroesProfile: key_HeroesProfile
        ,short_name_HeroesProfile: short_name_HeroesProfile
        
        ,key_HeroesTalents: key_HeroesTalents
        
        ,name: key_HeroesProfile
        ,role: objHeroes_HeroesProfile[key_HeroesProfile]["new_role"]
        ,type: objHeroes_HeroesProfile[key_HeroesProfile]["type"]
        
        ,translations: objHeroes_HeroesProfile[key_HeroesProfile]["translations"]
        
      }
      
      const tags = await return_tags_each_hero(key_HeroesTalents);
      tHeroBasic["tags"] = tags;
      
      
      const mongoHeroBasic = new HeroBasic(tHeroBasic);
    
      await mongoHeroBasic.save();
      
     
    }
    
     console.log("all HeroBasic have benn saved successfully!");
     
  } catch (error) {
      //console.log("");
      console.error(error);
  }
  
};
    



addAllHeroBasics();