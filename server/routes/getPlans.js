const express = require('express');
const router = express.Router();
const getDb = require('../queries').getDb;
const jwt = require('jsonwebtoken');
const cfg = require('../config.json');

//gets the whole workout list

router.get("/",(req,res)=>{
    const db = getDb();

    const query = "Select * FROM workout order by id ASC";
    db.query(query,(error,results)=>{
    if(error){
        res.status(500).json({message: "an error occured"});
        } else {
            res.status(200).json(results.rows);
        }
    });
    
});

module.exports = router;