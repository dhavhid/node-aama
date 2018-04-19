var AudienceSlugs = require('../utils/audience-slugs')
var HandleErrorsFn = require('../utils/handle-errors')

module.exports = function singlePostFn( app ) {

	return function singlePost( req, res ) {

		var audience = req.session.audience
		audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

		var post_id = req.params.id

		app.cms( "get", "/contents/"+post_id)

		.then(function( post ) {
			res.render('post', {
				layout: 'blog',
				title: "AAMA Blog",
				author: true,
				post: post,
				audience: audience,
				audienceSlug: AudienceSlugs.toSlug(audience),
			})
		})	

		.catch( HandleErrorsFn( req, res ) )

	}
}