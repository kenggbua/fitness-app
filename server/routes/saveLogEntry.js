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
    let setnumber = req.body.setnumber;
    let date = new Date().toISOString().slice(0, 19).replace('T', ' '); //initializes date and converts to sql format
    console.log("username: "+ u_name);
    console.log("exersicename: " + exersice_name);
    console.log("setnumber: " + setnumber);
    console.log("Date: "+ date);

    
    db.query({
        
        text: `INSERT INTO log_entry (u_name, exercise_name, iscardio, setnumber,date) VALUES ($1, $2, $3, $4, $5)`,
        values: [u_name,exersice_name,null,setnumber,date]},(error,results)=>{
    if(error){
        res.status(500).json({message: "an error occured"});
        } else {
            res.status(200).json(results.rows);
        }
    });
    
});

module.exports = router;