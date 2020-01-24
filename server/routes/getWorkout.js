const express = require('express');
const router = express.Router();
const getDb = require('../queries').getDb;
const jwt = require('jsonwebtoken');
const cfg = require('../config.json');

//gets the workout with the id in the params

router.get("/",(req,res)=>{
    const db = getDb();

    let id = req.query.id; //holt sich die params id

    console.log("id: "+ id);

    
    db.query({
        text: `Select * from ex_wo_junction where workout_id = $1;`,
        values: [id]},(error,results)=>{
    if(error){
        res.status(500).json({message: "an error occured"});
        } else {
            res.status(200).json(results.rows);
        }
    });
    
});

module.exports = router;