var express = require('express')
var consign = require('consign')
var bodyparser = require('body-parser')
var expressValidator = require('express-validator')
var cors = require('cors')

module.exports = function(){
	var app = express()

	app.use(bodyparser.urlencoded({extended: true}))
	
	app.use(bodyparser.json())

	app.use(expressValidator())

	app.use(cors())

	consign()
	 .include('controllers')
	 .then('persistencia')
	 .into(app)

	return app
}