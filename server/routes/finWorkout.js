const express = require('express');
const router = express.Router();
const getDb = require('../queries').getDb;
const jwt = require('jsonwebtoken');
const cfg = require('../config.json');


router.get('/:id', (req, res) => {
  const db = getDb();
  let username;
  let id = req.params.id;
  try {
    username = jwt.verify(req.headers.authorization, cfg.auth.jwt_key).data;
  } catch (err) {
    return res.status(401).json({
      message: "Authentication failed"
    });
  }

  console.log(username + " request datails about workout " + id);

//TODO: check if user is allowed to read this info
  db.query({
    text: `SELECT exercise_name, setnumber, weight, repetitions, duration FROM public.log_entry WHERE workout_fin_id = $1 order by id;`,
    values: [id]
  })

  .then((result) => {

    // no results
    if (!result) {
      console.log("Workout " + id + " not found");
      res.status(401).json({
        "message": "workout not found"
      });
      return;
    }

    console.log("Workout " + id + " found");
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
