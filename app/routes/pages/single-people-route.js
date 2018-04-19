var HandleErrorsFn = require('../utils/handle-errors')
var HandleCMSErrorsFn = require('../utils/handle-cms-errors')

module.exports = function peopleRouteFn( app ) {

	return function peopleRoute( req, res ) {

		var name = req.params.slug ? req.params.slug : undefined

		app.cms( "get", "/public/contents/user/slug/"+name, {} )

		.then(
			function( people ) {
				res.render('people', {
					layout: 'static',
					people: people,
					slug: pageSlug,
				})
			}
		)

		
		.catch( HandleErrorsFn( req, res ) )
	}
}