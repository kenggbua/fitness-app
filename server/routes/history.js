const express = require('express');
const router = express.Router();
const getDb = require('../queries').getDb;
const jwt = require('jsonwebtoken');
const cfg = require('../config.json');

router.get('/:num', (req, res) => {
  const db = getDb();
  let username;
  try {
    username = jwt.verify(req.headers.authorization, cfg.auth.jwt_key).data;
  } catch (err) {
    return res.status(401).json({
      message: "Authentication failed"
    });
  }

  console.log(username + " requested history");

  db.query({
      text: `Select TO_CHAR(date, 'dd.mm.yyyy') as date, sum(weight) as sumWeight from public.log_entry where u_name = $1 group by date order by date desc limit $2;`,
      values: [username, req.params.num]
    })

    .then((result) => {
      console.log("send " + username + "'s history");
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
