const express = require('express');
const router = express.Router();
const getDb = require('../queries').getDb;
const jwt = require('jsonwebtoken');
const cfg = require('../config.json');

router.get('/', (req, res) => {
  try {
    let username = jwt.verify(req.headers.authorization, cfg.auth.jwt_key).data;
    username = JSON.stringify(username);
    let user;
    console.log(username + " request userdata");

    db.query({
      text: `SELECT * FROM public.users WHERE u_name = $1`,
      values: [username]
    })
  
    .then((result) => {
        user = result.rows[0];
        
        // no results
        if (!resultUser) {
          res.status(401).json({
            "message": "user not found"
          });
          return;
        }

        res.status(200).json({
          data: user
      });
      });

  } catch (err) {
    return res.status(401).json({
      message: "Authentication failed"
    });
  }
});

module.exports = router;
