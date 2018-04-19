var _ = require('lodash')
var AudienceSlugs = require('../utils/audience-slugs')
var HandleErrorsFn = require('../utils/handle-errors')
var HandleCMSErrorsFn = require('../utils/handle-cms-errors')

module.exports = function faqRouteFn( app ) {
	
	return function faqRoute( req, res ) {

		var audience = req.session.audience
		audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

		var category =  req.params.category ? _.startCase(req.params.category) : "General"

		Promise.all([
			category,
			app.cms( "get", "/contents/faq/list", {
				category : category
			} ),
			app.cms( "get", "/category/faq/list", {} )
		])

		.then(
			function( faqs ) {
				var category = faqs[0]
				var faq_list = faqs[1]
				var category_list = faqs[2]

				res.render('faqs', {
					layout: 'static',
					title: "Frequently Asked Questions",
					post: faq_list.data,
					category: category,
					categories: category_list.data,
					audience: audience,
					audienceSlug: AudienceSlugs.toSlug(audience),
				})
			},
			HandleCMSErrorsFn( res )
		)
		
		.catch( HandleErrorsFn( req, res ) )
	}
}