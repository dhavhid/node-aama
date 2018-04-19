var _ = require('lodash')
var Url = require('url')
var AudienceSlugs = require('./utils/audience-slugs')
var HandleErrorsFn = require('./utils/handle-errors')

module.exports = function homeRouteFn( app ) {

	return function homeRoute( req, res ) {

		// var path = Url.parse(req.originalUrl).pathname
		// if(path == "/") { req.session.audience = '' }
		// path = path.substring(1)
		// console.log(Url.parse(req.originalUrl))

		var audience = req.session.audience
		audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience
		
		var subject = req.params.subject ? _.startCase(req.params.subject) : undefined

		app.cms( "get", "/contents/news/list", {
			limit : 3,
			page : 1,
		})

		.then(function( posts ) {

			res.render('home', {
				layout: 'main',
				audience: audience,
				audienceSlug: AudienceSlugs.toSlug(audience),
				subject: subject,
				news: posts.data,
			})
		})

		.catch( HandleErrorsFn( req, res ) )
		
	}
}