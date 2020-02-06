const express = require('express');
const router = express.Router();
const getDb = require('../queries').getDb;
const jwt = require('jsonwebtoken');
const cfg = require('../config.json');

//gets the workout with the id in the params

router.post("/",(req,res)=>{
    const db = getDb();

    let workout_fin_id = req.body.workout_fin_id
    let exersice_name = req.body.exercise;
    let reps = req.body.reps;
    let setnumber = req.body.setnumber;
    let weight = req.body.weight;
    let duration = req.body.duration;
    let iscardio = req.body.iscardio;
 

    console.log("workout_fin_id: " + workout_fin_id)
    console.log("exersicename: " + exersice_name);
    console.log("setnumber: " + setnumber);
    console.log("iscardio: " + iscardio)
    console.log("weight: " + weight)
    console.log("reps: " + reps)
    console.log("duration: " + duration)

    //INSERT INTO public.log_entry (workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (1, 'Squat', 5, 1, 100, null, false);

    db.query({        
        text: `INSERT INTO public.log_entry (workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        values: [workout_fin_id, exersice_name, reps, setnumber, weight, duration, iscardio]},(error,results)=>{
    if(error){
        res.status(500).json({message: error});
        } else {
            res.status(200).json(results.rows);
        }
    });
    
});

module.exports = router;