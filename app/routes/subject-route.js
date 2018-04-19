var _ = require('lodash')
var Url = require('url')
var AudienceSlugs = require('./utils/audience-slugs')
var HandleErrorsFn = require('./utils/handle-errors')

module.exports = function subjectRouteFn( app ) {

	return function subjectRoute( req, res ) {

		// var path = Url.parse(req.originalUrl).pathname
		// if(path == "/") { req.session.audience = '' }
		// path = path.substring(1)
		// console.log(Url.parse(req.originalUrl))

		var audience = req.session.audience
		audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience
		
		var subject = req.params.subject ? _.startCase(req.params.subject) : undefined
		if (req.query.subjectName) {
			subject = req.query.subjectName.replace('-',' & ')
		}

		Promise.all([
			app.cms( "get", "/public/contents/static_page/slug/"+req.params.subject, {}),
			app.cms( "get", "/public/contents/static_page/list", {
				audiences: audience,
				subject_matter: subject
			} ),
			app.cms( "get", "/public/contents/news/list", {
				audiences: audience,
				subject_matter: subject,
				//limit : 3,
				//page : 1,
			})
		])
		.then(function( content ) {

			var subject_page = content[0]
			var pages = content[1].data
			var posts = content[2].data
			
			// _.remove(pages, function(page) {
			// 	return page.parentPage != null
			// })

			_.remove(pages, function(page) {
				return page.parentPage != subject_page.id
			})

			pages = _.sortBy(pages, 'order')

			// if (subject == "Membership") {
			// 	app.cms( "get", "/public/contents/static_page/slug/home-"+AudienceSlugs.toSlug(audience), {})
			// 	.then(function(welcomePage) {
			// 		res.render('subject-matter', {
			// 			layout: 'static',
			// 			title: subject,
			// 			audience: audience,
			// 			audienceSlug: AudienceSlugs.toSlug(audience),
			// 			subject: subject,
			// 			subject_content: welcomePage,
			// 			pages: pages,
			// 			news: posts,
			// 		})
			// 	})
			// 	.catch( HandleErrorsFn( res ) )
			// }

			// newpages = _.filter(pages, function(page) {
			// 	if(!page.parentPage) {
			// 		return true
			// 	}
			// })

			// _.forEach(_.difference(pages, _.remove(pages, function(page) {
			// 	return page.parentPage != null
			// })), function(o) { console.log("REMOVED --> "+o.title+">>parentPage: "+o.parentPage) })

			res.render('subject-matter', {
				layout: 'static',
				title: subject,
				audience: audience,
				audienceSlug: AudienceSlugs.toSlug(audience),
				subject: subject,
				subject_content: subject_page,
				pages: pages,
				news: posts,
			})
		})

		.catch( HandleErrorsFn( req, res ) )
		
	}
}