var HandleErrorsFn = require('../utils/handle-errors')
var _ = require('lodash')

module.exports = function logoutRouteFn( app ) {
	
	return function logoutRoute( req, res, done ) {

		req.session.destroy(function(err) {
			
			// Bail if there is an error
			if( err ) {
				return res.status(500).render('error', {
					layout: 'static',
					title: '500',
					message: 'It looks like something went wrong inside the server '+
					         'while trying to remove your session information.',
				})
			}
			
			// Delete custom cookies
			req.cookies.set( "user" )
			
			res.render('error', {
				layout: 'static',
				title: 'Logged Out',
				message: 'You have successfully logged out of your account.'
			})
		})
	}
}