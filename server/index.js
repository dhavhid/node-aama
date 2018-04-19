var Http = require('http')
var Express = require('express')
var CreateSoapClient = require('./config/soap')
var CreateCmsConnection = require('./config/cms')
var SetupSessions = require('./config/sessions')
var SetupMiddleware = require('./config/middleware')
var SetupViewEngine = require('./config/view-engine')
var SetupRoutes = require('../app/routes')

require('dotenv').load()

Promise.resolve().then(function() {
	
	var app = Express()
	app.locals.env = process.env
	app.sba = CreateSoapClient()
	app.cms = CreateCmsConnection()
	
	Http.createServer(app).listen(process.env.PORT || 4111, function() {
		console.log('Server listening at: ', process.env.WEBSITE_URL )
	})
	
	SetupViewEngine( app )
	SetupMiddleware( app )
	SetupSessions( app )
	SetupRoutes( app )
	
}).then(null,function( error ) {
	console.error( error )
})