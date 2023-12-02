const express = require('express');
const apiRouter = express.Router();

//checkMillionDollarIdea
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const { 
    isValidMeeting,
    isValidIdea,
    isValidMinion,
    createMinion,
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase, 
    } = require('./db')


    /*------minions Routes-----*/

    apiRouter.get('/minions', (req, res, next)=>{
        const minions = getAllFromDatabase('minions');
        //console.log(minions)
        if(minions){
            res.status(200).json(minions);
        } else {
            res.status(404).send();
        }
       
    })


    apiRouter.post('/minions', (req, res, next)=>{
        const newMinion = req.body;
        
        console.log(newMinion);
        if(isValidMinion(newMinion)){
            addToDatabase('minions', newMinion);
            res.status(201).json(newMinion);
        } else {
            res.status(404).send('invalid minion');
        }
        
    })

    apiRouter.get('/minions/:minionId', (req, res, next)=>{
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

    apiRouter.put('/minions/:minionId', (req, res, next)=>{
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

    apiRouter.delete('/minions/:minionId', (req, res, next)=>{
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

    /*------ideas Routes-----*/

    apiRouter.get('/ideas', (req, res, next)=>{
        const ideas = getAllFromDatabase('ideas');
        //console.log(ideas)
        if(ideas){
            res.status(200).json(ideas);
        } else {
            res.status(404).send();
        }
       
    })


    apiRouter.post('/ideas', checkMillionDollarIdea, (req, res, next)=>{
        const newIdea = req.body;
        
        console.log(newIdea);
        if(isValidIdea(newIdea)){
            addToDatabase('ideas', newIdea);
            res.status(201).json(newIdea);
        } else {
            res.status(400).send('Bad request');
        }
        
    })

    apiRouter.get('/ideas/:ideaId', (req, res, next)=>{
        const id = req.params.ideaId;
        const foundIdea = getFromDatabaseById('ideas', id);
        if(foundIdea){
            if(isValidIdea(foundIdea)){
                res.status(200).json(foundIdea)
            } else {
                res.status(404).send('Not valid id');
            }
            
        } else {
            res.status(404).send('Not found');
        }
    })

    apiRouter.put('/ideas/:ideaId', (req, res, next)=>{
        const id = req.params.ideaId;
        const foundIdea = getFromDatabaseById('ideas', id)
        //console.log("FOUND: ", foundIdea)
        const dataReceived = req.body;
        //console.log("received data: ", dataReceived);

        if(foundIdea){
            if(isValidIdea(foundIdea)){
                const updatedData = updateInstanceInDatabase('ideas', dataReceived);
                 //console.log("Updated data: ", updatedData)
                 res.status(200).json(updatedData);
            } else {
                res.status(404).send('invalid id');
            }
        
        } else {
            res.status(404).send('Not found');
        }
    })

    apiRouter.delete('/ideas/:ideaId', (req, res, next)=>{
        const id = req.params.ideaId;
        const foundIdea = getFromDatabaseById('ideas', id);
        //console.log("Deleted item", foundIdea);
        if(foundIdea){
            if(isValidIdea(foundIdea)){
                deleteFromDatabasebyId('ideas', id);
                res.status(204).send('deleted');
            } else {
                res.status(404).send('invalid id');
            }
            
        } else {
            res.status(404).send('failed to delete');
        }
    })

    /*------ideas Routes-----*/

    apiRouter.get('/meetings', (req, res, next)=>{
        const meetings = getAllFromDatabase('meetings');
        //console.log(meetings)
        if(meetings){
            res.status(200).json(meetings);
        } else {
            res.status(404).send();
        }
       
    })


    apiRouter.post('/meetings', (req, res, next)=>{
        const newMeeting = createMeeting();
        
        //console.log(newMeeting);
        if(isValidMeeting(newMeeting)){
            addToDatabase('meetings', newMeeting);
            res.status(201).json(newMeeting);
        } else {
            res.status(404).send('invalid meeting');
        }
        
    })


    apiRouter.delete('/meetings', (req, res, next)=>{
    
        const deleted = deleteAllFromDatabase('meetings');
        //console.log("Deleted item", deleted);
        if(Array.isArray(deleted) && deleted.length === 0){
            res.status(204).send('deleted');
        } else {
            res.status(404).send('failed to delete');
        }
    })



    
module.exports = apiRouter;
