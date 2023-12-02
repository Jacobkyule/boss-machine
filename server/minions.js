const express = require('express');
minionsRouter = express.Router();


const { 
    isValidMinion,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
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

minionsRouter.use('/', (req, res, next)=>{
    const minions = getAllFromDatabase('minions');
    if(typeof minions === 'undefined'){
        return res.status(404).send('not found');
    } else {
        req.minions = minions;
        next();
    }
})

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
    const minions = req.minions;
    //console.log(minions)
    res.status(200).json(minions);  
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

module.exports = minionsRouter;