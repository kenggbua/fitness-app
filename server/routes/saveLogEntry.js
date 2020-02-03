const express = require('express');
const router = express.Router();
const getDb = require('../queries').getDb;
const jwt = require('jsonwebtoken');
const cfg = require('../config.json');

//gets the workout with the id in the params

router.post("/",(req,res)=>{
    const db = getDb();


    let u_name = req.body.user;
    let exersice_name = req.body.exercise;
    let iscardio = req.body.iscardio;
    let setnumber = req.body.setnumber;
    let weight = req.body.weight;
    let reps = req.body.reps;
    let duration = req.body.duration;
    let date = new Date().toISOString().slice(0, 10).replace('T', ' '); //initializes date and converts to sql format
    console.log("username: "+ u_name);
    console.log("exersicename: " + exersice_name);
    console.log("setnumber: " + setnumber);
    console.log("Date: "+ date);
    console.log("iscardio: " + iscardio)
    console.log("weight: " + weight)
    console.log("reps: " + reps)

    
    db.query({        
        text: `INSERT INTO public.log_entry (u_name, exercise_name, iscardio, setnumber,date,repetitions,weight,duration) VALUES ($1, $2, $3, $4, $5,$6,$7,$8)`,
        values: [u_name,exersice_name,iscardio,setnumber,date,reps,weight,duration]},(error,results)=>{
    if(error){
        res.status(500).json({message: error});
        } else {
            res.status(200).json(results.rows);
        }
    });
    
});

module.exports = router;