const express = require('express');
const router = express.Router();
const getDb = require('../queries').getDb;
const jwt = require('jsonwebtoken');
const cfg = require('../config.json');

router.get("/:username",(req,res)=>{
    const db = getDb();

    let u_name = req.params.username
    //select exercise_name, max_weight from public.one_rep_max  where u_name = 'testuser90'
    db.query({        
        text: `SELECT exercise_name, max_weight from public.one_rep_max  where u_name = $1;`,
        values: [u_name]
                
    },(error,results)=>{
    if(error){
        res.status(500).json({message: "an error occured"});
        } else {
            res.status(200).json(results.rows);
        }
    });
    
});


router.patch("/",(req,res)=>{
    console.log("in patch")
    const db = getDb();    
    
    let u_name = req.body.u_name; 
    let exercise_name = req.body.exercise
    let weight = req.body.weight  
    console.log("username: "+ u_name);
    console.log ("Exercise: "+ exercise_name)
    console.log("weight: "+ weight)


    //UPDATE one_rep_max set max_weight = $1 where u_name= $2 and exercise_name = $3;
    
    db.query({        
        text: `UPDATE one_rep_max set max_weight = $1 where u_name= $2 and exercise_name = $3;`,
        values: [weight, u_name, exercise_name]
                
    },(error,results)=>{
    if(error){
        res.status(500).json({message: error});
        } else {
            res.status(200).json(results.rows);
        }
    });
    
});

module.exports = router;