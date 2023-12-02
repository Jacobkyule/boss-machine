const express = require('express');
ideasRouter = express.Router();

//checkMillionDollarIdea
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const { 
    isValidIdea,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    } = require('./db')

    /*------ideas Routes-----*/

    ideasRouter.get('/', (req, res, next)=>{
        const ideas = getAllFromDatabase('ideas');
        //console.log(ideas)
        if(ideas){
            res.status(200).json(ideas);
        } else {
            res.status(404).send();
        }
       
    })


    ideasRouter.post('/', checkMillionDollarIdea, (req, res, next)=>{
        const newIdea = req.body;
        
        console.log(newIdea);
        if(isValidIdea(newIdea)){
            addToDatabase('ideas', newIdea);
            res.status(201).json(newIdea);
        } else {
            res.status(400).send('Bad request');
        }
        
    })

    ideasRouter.get('/:ideaId', (req, res, next)=>{
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

    ideasRouter.put('/:ideaId', (req, res, next)=>{
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

    ideasRouter.delete('/:ideaId', (req, res, next)=>{
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

module.exports = ideasRouter;