let mysql = require('mysql');
let connection = mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'nkr@1430',
	database:'traveler_app',
    port:'3306'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Database Connected Successfully..!!');
	}
});

module.exports = connection;