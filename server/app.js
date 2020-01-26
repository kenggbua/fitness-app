let express = require('express');
let cors = require('cors');
const bodyParser = require('body-parser');



//Config reinholen port etc.
let cfg = require('./config.json');

//DB Verbindung
const db = require('./queries');

const app = express();
app.use(cors());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/register", require('./routes/register'));
app.use("/login", require('./routes/login'));
app.use("/plans",require('./routes/getPlans'));
app.use("/workout",require('./routes/getWorkout'));
app.use("/saveLogEntry",require('./routes/saveLogEntry'));

//muss noch nach routes verschoben werden
app.get('/', function (req, res) {
console.log("hello");
  res.send('Hello World!');
});

app.get('/users',function(req,res){ db.getDb().query({
  text: `SELECT * FROM public.users`
}).then(results => {res.send(results.rows)})
});

app.get('/workout1',function(req,res){ db.getDb().query({
  text: `SELECT * from ex_wo_junction where workout_id = 1;`
}).then(results => {res.send(results.rows)})
});

app.get('/log1',function(req,res){ db.getDb().query({
  text: `SELECT * from log_entry  left join entry_cardio ec on log_entry.id = ec.log_id left join entry_strength es on log_entry.id = es.log_id
  where log_entry.u_name= 'testuser' and date = '2020-01-10'
  order by log_entry.id;`
}).then(results => {res.send(results.rows)})
});




db.initDb.then(() => {
  app.listen(cfg.server.port, () => {
      console.log("Listening on port " + cfg.server.port + "...");
  });
}, () => {console.log("Failed to connect to DB!")});
