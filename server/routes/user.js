const express = require('express');
const router = express.Router();
const getDb = require('../queries').getDb;
const jwt = require('jsonwebtoken');
const cfg = require('../config.json');

router.patch('/:username', (req, res) => {
  const db = getDb();
  let username = req.params.username;

  console.log(username + " update userdata");

  db.query({
    text: `Update public.users SET weight = $1, height = $2 WHERE u_name = $3;`,
    values: [req.body.weight, req.body.height, username]
  })
  .then((result) => {
    // no results
    if (!result) {
      console.log(username + " not possible to update");
      res.status(401).json({
        "message": "user not found"
      });
      return;
    }

    console.log(username + " updated");
    res.status(200).json({
      message: "user updated"
    });
  })

  .catch(error => {
    console.log("error accessing db");
    if (error) {
      res.status(400).json({
        "message": "error ocurred"
      });
    }
  });
});

router.get('/', (req, res) => {
  const db = getDb();
  let username;
  let user;
  try {
    username = jwt.verify(req.headers.authorization, cfg.auth.jwt_key).data;
  } catch (err) {
    return res.status(401).json({
      message: "Authentication failed"
    });
  }

  console.log(username + " request userdata");

  db.query({
    text: `SELECT * FROM public.users WHERE u_name = $1;`,
    values: [username]
  })

  .then((result) => {
    user = result.rows[0];

    // no results
    if (!user) {
      console.log(username + " not found");
      res.status(401).json({
        "message": "user not found"
      });
      return;
    }

    console.log(username + " found");
    res.status(200).json({
      data: user
    });
  })

  .catch(error => {
    console.log("error accessing db");
    if (error) {
      res.status(400).json({
        "message": "error ocurred"
      });
    }
  });

});

module.exports = router;
