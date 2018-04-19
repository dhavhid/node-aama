var Handlebars = require('express-handlebars')

module.exports = function( app ) {
	
	app.set('views', process.cwd() + '/app/templates')
	
	app.expressHandlebars = Handlebars.create({
		defaultLayout: 'main',
		layoutsDir: 'app/templates/layouts',
		partialsDir: 'app/templates/partials',
		extname: '.hbs',
		helpers: require('../../app/templates/helpers/helpers-index')
	})
	
	app.engine('.hbs', app.expressHandlebars.engine)
	
	app.set('view engine', '.hbs')
}