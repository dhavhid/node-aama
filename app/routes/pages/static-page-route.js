var _ = require('lodash')
var AudienceSlugs = require('../utils/audience-slugs')
var HandleErrorsFn = require('../utils/handle-errors')
var HandleCMSErrorsFn = require('../utils/handle-cms-errors')

var level = 0

function findParentPage(child, pageList, parentsArray) {

	_.forEach(pageList, function(page) {
		if (child.parentPage == page.id) {
			var parent = {}
			parent['level'] = level
			parent['id'] = page.id
			parent['title'] = page.title
			parent['slug'] = page.slug

			parentsArray.push(parent)

			if (page.parentPage != null) {
				level++
				findParentPage(page, pageList, parentsArray)
			}
			return false;
		}
	})

	return parentsArray

}

module.exports = function pagesRouteFn( app ) {

	return function pagesRoute( req, res ) {

		var audience = req.session.audience
		audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

		var pageSlug = req.params.slug

		app.cms( "get", "/public/contents/static_page/slug/"+pageSlug, {} )
		.then( function ( content ) {
			if (_.isEmpty(content)) throw "Requested page could not be found."

			var page_content = content

			if (content.isMembersOnly != undefined) {
				if (content.isMembersOnly && req.session.user == undefined) {
					res.render('post',{
						layout          : "static",
						title           : 'Pages',
						audience        : audience,
						error           : true,
						message         : 'You need to be logged in to see this content.',
						audienceSlug    : AudienceSlugs.toSlug(audience)
					})
					return
				}
			}
			app.cms( "get", "/public/contents/static_page/list", {
				audiences: audience
			} )
			.then(
				function( subpages ) {

					var pages = subpages.data
					var parents = []

					// Find Parents
					if (page_content.parentPage != null) {
						parents = findParentPage(page_content, pages, parents)
						parents = _.sortByOrder(parents, 'level', 'desc')
					}

					// Filter pages
					_.remove(pages, function(page) {
						return page.parentPage != page_content.id
					})

					var child_pages = _.sortBy(pages, 'order')

					res.render('post', {
						layout: 'static',
						author: false,
						post: page_content,
						parents: parents,
						children: child_pages,
						slug: pageSlug,
						page: true,
						error: false,
						audience: audience,
						audienceSlug: AudienceSlugs.toSlug(audience),
					})
				}
			)
			.catch( HandleErrorsFn( req, res ) )
		})
		.catch( HandleErrorsFn( req, res ) )
	}
}