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

    const isValid = (req, res, next)=>{
        const receivedData = req.body;
        if(!isValidIdea(receivedData)){
            return res.status(400).send('invalid idea')
        } else {
            next();
        }
    }
    
    ideasRouter.use('/', (req, res, next)=>{
        const ideas = getAllFromDatabase('ideas');
        if(typeof ideas === 'undefined'){
            return res.status(404).send('not found');
        } else {
            req.ideas = ideas;
            next();
        }
    })
    
    ideasRouter.param('ideaId', (req, res, next, id)=>{
        const ideaId = id;
        const foundIdea = getFromDatabaseById('ideas', ideaId);
        if(!foundIdea){
            res.status(404).send('Not found');     
        } else if(!isValidIdea(foundIdea)){
            res.status(400).send('invalid idea');
        } else {
            req.foundIdea = foundIdea;
            req.ideaId = ideaId;
            next();
        }
    })
    

    ideasRouter.get('/', (req, res, next)=>{
        const ideas = req.ideas;
        res.status(200).json(ideas); 
    })


    ideasRouter.post('/', checkMillionDollarIdea, isValid, (req, res, next)=>{
            addToDatabase('ideas', req.body);
            res.status(201).json(req.body);
    })

    ideasRouter.get('/:ideaId', (req, res, next)=>{
        const idea = req.foundIdea;
        res.status(200).json(idea);     
    })

    ideasRouter.put('/:ideaId', isValid, (req, res, next)=>{ 
        const updatedData = updateInstanceInDatabase('ideas', req.body);
        res.status(200).json(updatedData);       
    })

    ideasRouter.delete('/:ideaId', (req, res, next)=>{
        deleteFromDatabasebyId('ideas', req.ideaId);
        res.status(204).send('deleted');
            
    })

module.exports = ideasRouter;