var _ = require('lodash')

module.exports = function handleCMSErrorsFn( res ) {
	
	return function handleCMSErrors(err) {

		var stack = _.get(err, "stack")
		
		console.log("CMS Error:", stack ? stack : err )
		
		res.locals.layout = "main"

		res.status(502).render('error', {
			status: "502",
			title: "Uh oh, looks like we couldn't access this content.",
			message: _.isString( err ) ? err : 'The CMS server did not understand that request.'
		})
	}
}