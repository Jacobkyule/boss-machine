const express = require('express');
minionsRouter = express.Router();


const { 
    isValidWork,
    isValidMinion,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    findDataArrayByName,
    } = require('./db')

/*------minions Routes-----*/
const isValid = (req, res, next)=>{
    const receivedData = req.body;
    if(!isValidMinion(receivedData)){
        return res.status(400).send('invalid minion')
    } else {
        next();
    }
}

minionsRouter.param('minionId', (req, res, next, id)=>{
    const minionId = id;
    const foundMinion = getFromDatabaseById('minions', minionId);
    if(!foundMinion){
        res.status(404).send('Not found');     
    } else if(!isValidMinion(foundMinion)){
        res.status(400).send('invalid minion');
    } else {
        req.foundMinion = foundMinion;
        req.minionId = minionId;
        next();
    }
})

minionsRouter.get('/', (req, res, next)=>{
    const minions = getAllFromDatabase('minions');
    //console.log(minions)
    if(minions){
        res.status(200).json(minions);
    } else {
        res.status(404).send();
    }  
})



minionsRouter.post('/', isValid, (req, res, next)=>{
        addToDatabase('minions', req.body);
        res.status(201).json(req.body); 
})

minionsRouter.get('/:minionId', (req, res, next)=>{ 
    const minion = req.foundMinion;  
    res.status(200).json(minion);       
})

minionsRouter.put('/:minionId', isValid, (req, res, next)=>{
    const updatedData = updateInstanceInDatabase('minions', req.body);
    res.status(200).json(updatedData);      
})

minionsRouter.delete('/:minionId', (req, res, next)=>{
    deleteFromDatabasebyId('minions', req.minionId);
    res.status(204).send('deleted');
})

minionsRouter.get('/:minionId/work', (req, res, next)=>{
   const minionId = req.params.minionId;
   const allWorkArr = getAllFromDatabase('work');
   const arrOfWorkByMinionId = allWorkArr.filter((work) => {
    
    return work.minionId === minionId;
})
   if (req.foundMinion && arrOfWorkByMinionId.length > 0) {
    console.log(arrOfWorkByMinionId);
    res.status(200).json(arrOfWorkByMinionId);
   } else {
    res.status(404).send();
   }
})

minionsRouter.post('/:minionId/work', (req, res, next)=>{
const workToAdd = req.body;
workToAdd.minionId = req.params.minionId;

if(isValidWork(workToAdd)){
    const createdWork = addToDatabase('work', workToAdd);
    res.status(201).json(createdWork);
} else {
    res.status(400).send();
}
    
})

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
      req.work = work;
      req.workId = id;
      next();
    } else {
      res.status(404).send();
    }
  });

minionsRouter.put('/:minionId/work/:workId', (req, res, next)=>{
  if(req.minionId !== req.body.minionId){
    res.status(400).send();
  } else {
    updatedWork = updateInstanceInDatabase('work', req.body);
    res.status(200).json(updatedWork);
  }
})

minionsRouter.delete('/:minionId/work/:workId', (req, res, next)=>{
    const deleted = deleteFromDatabasebyId('work', req.workId);
    if(req.foundMinion && deleted){
        res.status(204).send();
    } else{
        res.status(400).send();
    }
})

module.exports = minionsRouter;