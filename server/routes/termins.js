const express = require('express');
const router = express.Router();
const getDb = require('../queries').getDb;
const jwt = require('jsonwebtoken');
const cfg = require('../config.json');

//load all termins from db

router.get("/:user",(req,res)=>{
    console.log('in getTermin');
    const db = getDb();
    let username;
    try {
        username = req.params.user;
        console.log(username);
    } catch (err) {
        return res.status(401).json({
            message: "Authentication failed"
        });
    }

    console.log(username + "requested termins");

    db.query({
        text: `Select * from  termin where u_name = $1;`,
        values: [username]
    })

        .then((result) => {
            console.log("send " + username + "'s termins");
            res.status(200).json({
                data: result.rows
            });
        })
        .catch(error => {
            console.log("error accessing db");
            if (error) {
                res.status(500).json({
                    "message": "error ocurred"
                });
            }
        });

})

router.post("/", (req, res) => {
    let db = getDb();
    let username = req.body.user;
    let subject = req.body.subject;
    let date = req.body.date;
    let start = req.body.start;

    console.log(username);
    console.log(subject);
    console.log(date);
    console.log(start);

    db.query({
        text: `INSERT INTO public.termin (u_name, subject, date, time) VALUES ($1, $2, $3, $4);`,
        values: [username, subject, date, start]},(error,results)=>{
        if(error){
            res.status(500).json({message: error});
        } else {
            res.status(200).json('insert successful');
        }
    });

});

module.exports = router;