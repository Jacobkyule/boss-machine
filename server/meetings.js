const express = require('express');
meetingsRouter = express.Router();

const { 
    isValidMeeting,
    createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase, 
    } = require('./db')

     /*------meetings Routes-----*/

     meetingsRouter.get('/', (req, res, next)=>{
        const meetings = getAllFromDatabase('meetings');
        //console.log(meetings)
        if(meetings){
            res.status(200).json(meetings);
        } else {
            res.status(404).send();
        }
       
    })


    meetingsRouter.post('/', (req, res, next)=>{
        const newMeeting = createMeeting();
        
        //console.log(newMeeting);
        if(isValidMeeting(newMeeting)){
            addToDatabase('meetings', newMeeting);
            res.status(201).json(newMeeting);
        } else {
            res.status(404).send('invalid meeting');
        }
        
    })


    meetingsRouter.delete('/', (req, res, next)=>{
    
        const deleted = deleteAllFromDatabase('meetings');
        //console.log("Deleted item", deleted);
        if(Array.isArray(deleted) && deleted.length === 0){
            res.status(204).send('deleted');
        } else {
            res.status(404).send('failed to delete');
        }
    })


    module.exports = meetingsRouter;