const express = require('express');
const router = express.Router();
const getDb = require('../queries').getDb;
const jwt = require('jsonwebtoken');
const cfg = require('../config.json');

//gets the workout with the id in the params

router.post("/",(req,res)=>{
    const db = getDb();

    
    let u_name = req.body.u_name;
    let workout_id = req.body.workout_id;
    let date = new Date().toISOString().slice(0, 10).replace('T', ' '); //initializes date and converts to sql format
    
    console.log("username: "+ u_name);
    console.log("workout_id: " + workout_id)
    console.log("Date: "+ date);
   

    //INSERT INTO public.workout_fin (u_name, workout_id, sumweight, date) VALUES ($1, $2, null, $3);

    
    db.query({        
        text: `INSERT INTO public.workout_fin (u_name, workout_id, sumweight, date) VALUES ($1, $2, $3, $4);`,
        values: [u_name, workout_id,null, date]},(error,results)=>{
    if(error){
        res.status(500).json({message: error});
        } else {
            res.status(200).json(results.rows);
        }
    });
    
});

module.exports = router;