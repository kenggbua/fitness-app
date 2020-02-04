const express = require('express');
const router = express.Router();
const getDb = require('../queries').getDb;
const jwt = require('jsonwebtoken');
const cfg = require('../config.json');

router.post('/', (req, res) => {
  const db = getDb();

  let user = req.body.user;
  let pass = req.body.pass;

  db.query({
    text: `SELECT * FROM public.users WHERE u_name = $1 AND u_encrypted_password = $2;`,
    values: [user, pass]
  })

  .then(result => {resultUser = result.rows[0];

    // no results
    if (!resultUser) {
      console.log(user + " wrong username or password");
        res.status(401).json({
          "message": "login failed"
        });
        return;
    }

    // everything ok
    const token = jwt.sign({data: user}, cfg.auth.jwt_key, {expiresIn: cfg.auth.expiration});
    console.log(user + " login successful");
    res.status(200).json({
        token: token
    });
  })

  .catch(error => {
            // error accessing db
            if (error) {
              console.log(user + " login. DB Error occured");
                res.status(500).json({
                    "message": "error ocurred"
                });
            }
        });
});

module.exports = router;
