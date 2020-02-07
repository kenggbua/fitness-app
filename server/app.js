let express = require('express');
let cors = require('cors');
let webpush = require('web-push');
let path = require('path');
const bodyParser = require('body-parser');

//generate VAPID keys to identify who sends push notification
const publicVapidKey = 'BFCMlOq1RWyZvCMu8XAJEQCi4_gClv-U_UJpxXSB_HyRdYwVpAP_8f_-IPaLIwLdI3Ca_ZS0t3odUe-8hO6w5vE';
const privateVapidKey = 'TaDVAIHlDk7xCzuBbv_HBNuW4sxVnSIalKrzqRy5ag0';

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    publicVapidKey,
    privateVapidKey
);

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
app.use("/user", require('./routes/user'));
app.use("/saveWorkoutFin",require('./routes/saveWorkoutFin'));
app.use("/getWorkoutFinId",require('./routes/getWorkoutFinId'));
app.use("/history", require('./routes/history'));
app.use("/terminplaner", require('./routes/termins'));
app.use("/insertTermin", require('./routes/termins'));
app.use("/finWorkout", require('./routes/finWorkout'));
app.use("/oneRepMax", require('./routes/oneRepMax'));

//just to test
app.get('/', function (req, res) {
console.log("hello");
  res.send('Hello World!');
});

db.initDb.then(() => {
  app.listen(cfg.server.port, () => {
      console.log("Listening on port " + cfg.server.port + "...");
  });
}, () => {console.log("Failed to connect to DB!")});


//subscribe route
app.post('/subscribe', (req, res)=>{
    //Get push subscription object
    const subsciption = req.body;

    //Send 201 status when resource was created successfully
    res.status(201).jsonp({});

    //create payload
    const payload = JSON.stringify({title: 'Kalender Push Notification'})

    //Pass object into sendNotification
    webpush.sendNotification(subsciption,payload).catch(err => console.error(err));
});
