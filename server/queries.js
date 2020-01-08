let cfg = require('./config.json')	
const { Client } = require('pg');

let client;

let initDb = new Promise((resolve, reject) => {

    //Zuerst Datenbank erstellen nicht vergessen

	client = new Client({
	    host: cfg.database.host,
	    user: cfg.database.user,
	    password: cfg.database.password,
	    database: cfg.database.db
	});

	// Mit Datenbank verbinden
	client.connect((err) => {
		// Wenn kein Error kommt bestätigung in der console
		// sonst Error
		if(!err) {
			console.log("Database is connected ...");
			resolve();
		}
		else {
			console.log("Error connecting database ...");
			console.log(err.stack);
			reject();
		}
	});
});

function getDb() {
    if (!client) {
        console.log("Db nicht initialisiert.");
        return;
    }
    return client;
}

  module.exports = {
    getDb,
    initDb
};