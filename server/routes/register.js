const express = require('express');
const router = express.Router();
const getDb = require('../queries').getDb;
const jwt = require('jsonwebtoken');
const cfg = require('../config.json');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', (req, res) => {
  const db = getDb();

  let mail = req.body.mail;
  let user = req.body.user;
  let pass = req.body.pass;

    bcrypt.hash(pass, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        db.query({
            text: `INSERT INTO public.users (u_email, u_name, u_encrypted_password, visible) VALUES ($1, $2, $3, false);`,
            values: [mail, user, hash]
        })

            .then(result => {
                //insert succsessful
                const token = jwt.sign({data: user}, cfg.auth.jwt_key, {expiresIn: cfg.auth.expiration});
                console.log(req.body.user + " added to db");
                res.status(200).json({
                    token: token
                });
            })

            .catch(error => {
                // insert failed
                let detail = error.detail;
                let field = detail.substring(detail.indexOf("(")+1, detail.indexOf(")"));

                if(field == "u_email") {
                    console.log("Mail " + req.body.mail + " already used");
                    res.status(401).json({
                        "message": "email alredy used"
                    });

                } else if(field == "u_name") {
                    console.log("Username" + req.body.user + " alredy used");
                    res.status(401).json({
                        "message": "username already used"
                    });

                } else {
                    console.log("db error adding " + req.body.user);
                    res.status(400).json({
                        "message": "error ocurred"
                    });
                }
            });
    });

});

module.exports = router;
