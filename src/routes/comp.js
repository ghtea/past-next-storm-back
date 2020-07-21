import express from 'express';


import Comp from '../models/Comp';

var router = express.Router();



// GET ALL Comps
router.get('/', (req, res) => {
  Comp.find((err, listComp) => {
    if (err) return res.status(500).send({
      error: 'database failure'
    });
    res.json(listComp);
  })
});



router.post('/', async (req, res, next) => {
  
  try {
    
    let tComp = new Comp(
      { 
        password: req.body.password
  
        ,title: req.body.title
        ,author: req.body.author
        
        ,added: req.body.added
        ,links: req.body.links
        ,tags: req.body.tags
        
        ,listPosition:req.body.listPosition
        
        ,rating: req.body.rating
        ,comments: req.body.comments
        
      });
      
    await tComp.save();
    
    res.send("new comp has been created!");
    
  } catch(error) { next(error) }
  
});







// READ Comp // maybe get should use params
router.get('/:idComp', async (req, res, next) => {
  
  try {
  
    const filter = { _id: req.params.idComp };
    
    Comp.findOne(filter, (err, tComp) => {
      if(err) return res.status(500).json({error: err});
      else if(!tComp) { return res.status(404).json({error: 'Comp not found'}); }
      else { res.json(tComp); }
    });

    
  } catch(error) { next(error) }
  
});




//UPDATE

router.put('/', async (req, res, next) => {
  try {
  
    if (req.body.filter && req.body.update) {
      
      const filter = req.body.filter;
      const update = req.body.update;
      
      await Comp.updateOne(filter, update);
      
      res.send("Comp has been updated!");  // res 에 아무것도 안주면 응답 없다고 에러 발생!
      
      
    } else { res.send('filter & update obj are necessary')  }
    
  } catch(error) {next(error)}
  
});




// DELETE Comp
router.delete('/:idComp', async (req, res, next) => {
  
  try {
  
    const filter = { _id: req.params.idComp };
    
    Comp.deleteOne(filter, (err, planTeam) => {
      if(err) return res.status(500).json({error: err});
      else if(!tComp) { return res.status(404).json({error: 'Comp not found'}); }
      else { res.send("plan has been deleted");}
    });
    
  } catch(error) { next(error) }
  
});



module.exports = router;









/*
// ADD OR UPDATE PlanTeam   없을 때 생성해야 하는 가능성을 포함

// 그냥 생성과 수정 나눠서 하는게 나을듯? upsert가 생각보다 좋지만은 않은듯...  
router.put('/', async (req, res, next) => {
  try {
  
    if (req.body.filter && req.body.update) {
      
      const filter = req.body.filter;
      const update = req.body.update;
      const option = {returnNewDocument: true, upsert: true };
      
      const result = await PlanTeam.findOneAndUpdate(filter, update, option);
      
      res.send("ahr working");  // res 에 아무것도 안주면 응답 없다고 에러 발생!
      
      return new Promise((resolve, reject)=> {
        if (!result) { console.log('already exists or error'); return;}
        else { console.log('sucessfully updated'); resolve(result); }
      })
      
    } else { res.json( { error: 'filter & update obj are necessary' }) }
    
  } catch(error) {next(error)}
  
});

*/








/*

let planTeam = await PlanTeam.findOne({_id : idPlanTeam});
const playerEntry = planTeam.listPlayerEntry.id(battletag); // ? 이거는 그냥 promise 반환하는게 아니라 비동기로 해도 되는듯?
playerEntry.set({mmrStandard: newMmrStandard});
await planTeam.save();

        .then((home) => {
          
            const tes=home.post.id("5a3fe65546c99208b8cc75b1");
            tes.set({"title" : "it workssdfg"});
            home.save();
        })
        .catch((err)=>{
            console.log("error");
        });
        
*/

/*
HomeModel.findOne({name : "tiger"})
        .then((home) => {
            console.log("findone")
            const tes=home.post.id("5a3fe65546c99208b8cc75b1");
            tes.set({"title" : "it workssdfg"});
            home.save();
        })
        .catch((err)=>{
            console.log("error");
        });
        */
