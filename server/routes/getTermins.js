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
        text: `Select * from  termin where u_name = $1 order by date, time;`,
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

});

module.exports = router;