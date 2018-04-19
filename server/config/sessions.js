var Session = require('express-session')
var MongoStore = require('connect-mongo')( Session )

module.exports = function setupSessions( app ) {
	
	/*
		Store session data in app.session.
		This is stored in a mongo database currently set up on mongolabs.
	*/
	
	app.use( Session({
	    secret: process.env.SESSION_SECRET,
	    store: new MongoStore({
	    	url: process.env.MONGODB_URL,
			ttl: 30 * 24 * 60 * 60 // 30 DAYS
	    }),
		resave : false,
		saveUninitialized : false
	}))
	
}