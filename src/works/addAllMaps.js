
// have not test here yet

import mongoose from 'mongoose';
import dotenv from "dotenv"
import axios from 'axios'


let Map = require('../models/Map');

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





const addAllMaps = async () => {
  
  try {
    const res_HeroesProfile = await axios.get(`https://api.heroesprofile.com/api/Maps?mode=json&api_token=${process.env.TOKEN_HP}`)
    const listMap = res_HeroesProfile.data;
    
  
    
    for (const objMap of listMap) {
      
      let rankedRotation;
      if (objMap["ranked_rotation"] === 1) {rankedRotation=true}
      else if (objMap["ranked_rotation"] === 0) {rankedRotation=false}
      
      let playable;
      if (objMap["playable"] === 1) {playable=true}
      else if (objMap["playable"] === 0) {playable=false}
      
      
      let lines;
      switch (objMap["name"]) {
        case "Alterac Pass":
          lines = 3;
          break;
        case "Battlefield of Eternity":
          lines = 2;
          break;
        case "Blackheart's Bay":
          lines = 3;
          break;
        case "Braxis Holdout":
          lines = 2;
          break;
        case "Cursed Hollow":
          lines = 3;
          break;
        case "Dragon Shire":
          lines = 3;
          break;
        case "Garden of Terror":
          lines = 3;
          break;
        case "Hanamura Temple":
          lines = 2;
          break;
        case "Haunted Mines":
          lines = 2;
          break;
        case "Infernal Shrines":
          lines = 3;
          break;
        case "Sky Temple":
          lines = 3;
          break;
        case "Tomb of the Spider Queen":
          lines = 3;
          break;
        case "Towers of Doom":
          lines = 3;
          break;
        case "Warhead Junction":
          lines = 3;
          break;
        case "Volskaya Foundry":
          lines = 3;
          break;
        default:
          lines = undefined;
      }
            
      
      
      
      
      
      
      
      
      
      
      let tMap = {
        
        _id: objMap["map_id"]
    
        ,name: objMap["name"]
  
        ,shortName: objMap["short_name"]
        
        ,lines: lines
        ,type: objMap["type"]
        
        ,rankedRotation: rankedRotation
        ,playable: playable
        
      }
      
 /*
   _id: Number
  ,name: String
  
  ,short_name: String
  ,type: String
  ,ranked_rotation: Boolean
  ,playable: Boolean
 */
 
 /*
 "map_id": 1,
    "name": "Battlefield of Eternity",
    "short_name": "BattlefieldOfEternity",
    "type": "standard",
    "ranked_rotation": 1,
    "playable": 1
 */
 
      
      const mongoMap = new Map(tMap);
    
      await mongoMap.save();
      
    }
    
    
     console.log("all Maps have benn saved successfully!");
     
  } catch (error) {
      //console.log("");
      console.error(error);
  }
  
};
    



addAllMaps();