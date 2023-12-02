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

minionsRouter.get('/', (req, res, next)=>{
    const minions = getAllFromDatabase('minions');
    //console.log(minions)
    if(minions){
        res.status(200).json(minions);
    } else {
        res.status(404).send();
    }
   
})


minionsRouter.post('/', (req, res, next)=>{
    const newMinion = req.body;
    
    console.log(newMinion);
    if(isValidMinion(newMinion)){
        addToDatabase('minions', newMinion);
        res.status(201).json(newMinion);
    } else {
        res.status(404).send('invalid minion');
    }
    
})

minionsRouter.get('/:minionId', (req, res, next)=>{
    const id = req.params.minionId;
    const foundMinion = getFromDatabaseById('minions', id);
    if(foundMinion){
        if(isValidMinion(foundMinion)){
            res.status(200).json(foundMinion)
        } else {
            res.status(404).send('Not Valid id');
        }
        
    } else {
        res.status(404).send('Not found');
    }
})

minionsRouter.put('/:minionId', (req, res, next)=>{
    const id = req.params.minionId;
    const foundMinion = getFromDatabaseById('minions', id)
    //console.log("FOUND: ", foundMinion)
    const dataReceived = req.body;
    //console.log("received data: ", dataReceived);
    if(foundMinion){
        if(isValidMinion(foundMinion)){
            const updatedData = updateInstanceInDatabase('minions', dataReceived);
             //console.log("Updated data: ", updatedData)
             res.status(200).json(updatedData);
        } else {
            res.status(404).send('invalid id');
        }
    
    } else {
        res.status(404).send('Not found');
    }
})

minionsRouter.delete('/:minionId', (req, res, next)=>{
    const id = req.params.minionId;
    const foundMinion = getFromDatabaseById('minions', id);
    //console.log("Deleted item", foundMinion);
    if(foundMinion){
        if(isValidMinion(foundMinion)){
            deleteFromDatabasebyId('minions', id);
            res.status(204).send('deleted');
        } else {
            res.status(404).send('invalid id');
        }
   
    } else {
        res.status(404).send('failed to delete');
    }
})

module.exports = minionsRouter;