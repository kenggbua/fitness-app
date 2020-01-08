let express = require('express');	
let cors = require('cors');
const bodyParser = require('body-parser');



//Config reinholen port etc. 
let cfg = require('./config.json');	

//DB Verbindung + Queries 
const db = require('./queries');

const app = express();
app.use(cors()); 					

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', function (req, res) { 
  
  res.send('Hello World!');  
});

app.get('/users',function(req,res){ db.getDb().query({
  text: `SELECT * FROM public.user`
}).then(results => {console.log(results.rows)})

});


db.initDb.then(() => {
  app.listen(cfg.server.port, () => {
      console.log("Listening on port " + cfg.server.port + "...");
  });
}, () => {console.log("Failed to connect to DB!")});

