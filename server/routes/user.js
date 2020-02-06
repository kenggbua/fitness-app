const express = require('express');
const router = express.Router();
const getDb = require('../queries').getDb;
const jwt = require('jsonwebtoken');
const cfg = require('../config.json');


router.get('/allusers',(req, res) => {
  let db = getDb();
  db.query({
    text: `SELECT u_name FROM public.users;`}).then(results => {res.send(results.rows)})
});

router.delete('/removefriend/:users', (req,res) => {
  let db = getDb();
  let users = req.params.users;
  let tmp = users.split("+");
  let user1 = tmp[0];
  let user2 = tmp[1];

  console.log(user1)
  console.log(user2)

  db.query({
    text: `DELETE FROM public.isFriend where (u_name1 = $1 AND u_name2 = $2) OR (u_name1 = $2 AND u_name2 = $1);`,
    values: [user1, user2]
  })
})

router.get('/getfriends/:username', (req,res) => {
  let db = getDb();
  let user = req.params.username;
  db.query({
        text: `SELECT * from public.isFriend where (u_name1 = $1 OR u_name2 = $1);`,
        values:  [user]
  }
  ).then(results => {res.send(results.rows)})
    }
)

router.post("/addfriend", (req, res) => {
  let db = getDb();
  let user1 = req.body.user1;
  let user2 = req.body.user2;



  db.query({
    text: `INSERT INTO public.isFriend (u_name1, u_name2) VALUES ($1, $2);`,
    values: [user1, user2]
  })
})

router.patch('/confirmfriend', (req,res) => {
  const db = getDb();
  let user1 = req.body.user1;
  let user2 = req.body.user2;

  db.query (
      {
        text: `Update public.isFriend set isConfirmed = true where (u_name1 = $1 AND u_name2 = $2)`,
        values: [user1, user2]
      }
  )
})

router.patch('/:username', (req, res) => {
  const db = getDb();
  let username = req.params.username;

  console.log(username + " update userdata");

  db.query({
    text: `Update public.users SET weight = $1, height = $2, visible = $3 WHERE u_name = $4;`,
    values: [req.body.weight, req.body.height, req.body.visible, username]
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
      res.status(500).json({
        "message": "error ocurred"
      });
    }
  });
});

router.get('/:username', (req, res) => {
  const db = getDb();
  let username;
  let reqUsername = req.params.username;
  let requestedUser;
  try {
    username = jwt.verify(req.headers.authorization, cfg.auth.jwt_key).data;
  } catch (err) {
    return res.status(401).json({
      message: "Authentication failed"
    });
  }

  console.log(username + " request userdata about " + reqUsername);

//TODO: check if requesting userdata is allowed (friend or public)
  db.query({
    text: `SELECT * FROM public.users WHERE u_name = $1 and (visible = true or $1 = $2);`,
    values: [reqUsername, username]
  })

  .then((result) => {
    requestedUser = result.rows[0];

    // no results
    if (!requestedUser) {
      console.log(reqUsername + " not found");
      res.status(401).json({
        "message": "user not found"
      });
      return;
    }

    console.log(reqUsername + " found");
    res.status(200).json({
      data: requestedUser
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
