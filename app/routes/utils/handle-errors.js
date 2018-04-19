var _ = require('lodash')
var AudienceSlugs = require('./audience-slugs')

module.exports = function handleAnyErrorsFn( req, res ) {

	return function handleAnyErrors(err) {

		var audience = req.session.audience
		audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

		var stack = _.get(err, "stack")
		
		console.log("Routing Error:", stack ? stack : err )
		
		res.locals.layout = "static"

		res.status(500).render('error', {
			status: "500",
			title: 'Uh oh, something went wrong.',
			message: _.isString( err ) ? err : 'There was an internal server error.',
			audience: audience,
			audienceSlug: AudienceSlugs.toSlug(audience)
		})
	}
}