const express = require('express');
const router = express.Router();
const getDb = require('../queries').getDb;
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  //const db = getDb();

  let user = req.body.user;
  let pass = req.body.pass;
    console.log(user);


  //Todo delete after db is created (just for testing)
  if(user == "nobody") {
    res.status(401).json({
      "message": "login failed"
    });
    return;
  }
  let id = resultUser.id;
  const token = jwt.sign({data: id, expiresIn: cfg.auth.expiration}, cfg.auth.jwt_key);
  res.status(200).json({
      token: token
  });
  return;


  //this is the real code
  const query = {
      text: 'SELECT * FROM users WHERE username = $1 AND password = $2',
      values: [user, pass]
    }

    db.query(query)
        .then (results => {
          resultUser = resultRows[0];

            // no results
            if (!resultUser) {
                res.status(401).json({
                  "message": "login failed"
                });
                return;
            }

            // everything ok
            let id = resultUser.id;
            const token = jwt.sign({data: id, expiresIn: cfg.auth.expiration}, cfg.auth.jwt_key);
            res.status(200).json({
                token: token
            });

        })
        .catch(error => {
            // error accessing db
            if (error) {
                res.status(400).json({
                    "message": "error ocurred"
                });
                return;
            }
        });
});

module.exports = router;
