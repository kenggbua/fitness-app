const express = require('express');
const router = express.Router();
const getDb = require('../queries').getDb;
const jwt = require('jsonwebtoken');
const cfg = require('../config.json');

//load all termins from db

router.get("/:username",(req,res)=>{
    const db = getDb();

    let username= req.params.username;

    console.log("subject: "+ subject);
    console.log("date: " + date);
    console.log("start: " + startTime);

    db.query({
        text: `Select * from  termin where u_name = username order by date;`,
        values: [username]},(error,results)=>{
        if(error){
            res.status(500).json({message: "an error occured"});
        } else {
            res.status(200).json(results.rows);
        }
    });

});

module.exports = router;