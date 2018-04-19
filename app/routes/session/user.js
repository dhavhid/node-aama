var AudienceSlugs = require('../utils/audience-slugs')
var HandleErrorsFn = require('../utils/handle-errors') 

module.exports = function userRouteFn( app ) {

	return function userRoute( req, res ) {

		var audience = req.session.audience
		audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

		var allowEditBusiness = false
		var user = req.session.user
		if (user.strRepStatus == 'M') {
			allowEditBusiness = true
		}
		res.render('user', {
			layout            : 'static',
			user              : req.session.user,
			allowEditBusiness : allowEditBusiness,
			audience          : audience,
			audienceSlug      : AudienceSlugs.toSlug(audience),
		})
	}
}