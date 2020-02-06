const express = require('express');
const router = express.Router();
const getDb = require('../queries').getDb;
const jwt = require('jsonwebtoken');
const cfg = require('../config.json');

//gets the workout with the id in the params

router.get("/:username",(req,res)=>{
    const db = getDb();

    let u_name = req.params.username; //holt sich die params id

    console.log("im get finID")
    console.log("id: "+ u_name);

    
    db.query({
        text: `Select max(id) from workout_fin where u_name = $1;`,
        values: [u_name]},(error,results)=>{
    if(error){
        res.status(500).json({message: "an error occured"});
        } else {
            res.status(200).json(results.rows);
        }
    });
    
});

module.exports = router;