var Express = require('express')
var BodyParser = require('body-parser')
var Cookies = require('cookies')

module.exports = function setupMiddleware( app ) {
	
	app.use( Express.static(process.cwd() + '/static') )
	app.use( BodyParser.json() )
	app.use( BodyParser.urlencoded({ extended: true }) ) // for parsing application/x-www-form-urlencoded
	
	app.use( Cookies.express([
		process.env.COOKIE_KEY_1,
		process.env.COOKIE_KEY_2,
		process.env.COOKIE_KEY_3,
	]))
	
}