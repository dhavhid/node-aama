var _ = require('lodash')
var AudienceSlugs = require('../utils/audience-slugs')
var HandleErrorsFn = require('../utils/handle-errors')
var HandleCMSErrorsFn = require('../utils/handle-cms-errors')

module.exports = function postsRouteFn( app ) {
	
	return function postsRoute( req, res ) {

		var audience = req.session.audience
		audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

		var subject = req.params.subject ? _.startCase(req.params.subject) : undefined
		var category =  req.params.category ? _.startCase(req.params.category) : undefined
		var tag = req.params.tag ? req.params.tag : undefined

		app.cms( "get", "/public/contents/news/list", {
			audiences: audience,
			subject_matter: subject,
			category : category,
			tag: tag
		})
		
		.then(
			function( posts ) {
				res.render('tag', {
					layout: 'blog',
					title: "AAMA Blog",
					posts: posts.data,
					audience: audience,
					audienceSlug: AudienceSlugs.toSlug(audience),
					subject: subject,
					category: req.params.category,
					tag: tag
				})
			},
			HandleCMSErrorsFn( res )
		)
		
		.catch( HandleErrorsFn( req, res ) )
	}
}