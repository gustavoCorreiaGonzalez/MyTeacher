var mysql = require('mysql')

function createDBConnection(){
	return mysql.createConnection({
		host: 'localhost',
		user: 'laravel',
		password: 'secret',
		database: 'myteacher'
	})
}

module.exports = function(){
	return createDBConnection
}