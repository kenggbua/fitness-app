const express = require('express');
const router = express.Router();
const getDb = require('../queries').getDb;
const jwt = require('jsonwebtoken');
const cfg = require('../config.json');

//load all termins from db

router.get("/:termin",(req,res)=>{
    const db = getDb();

    let username;
    try {
        username = jwt.verify(req.headers.authorization, cfg.auth.jwt_key).data;
    } catch (err) {
        return res.status(401).json({
            message: "Authentication failed"
        });
    }

    console.log(username + "requested termins");

    db.query({
        text: `Select * from  termin where u_name = username order by date, time;`,
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