var _ = require('lodash')

module.exports = function userCannotHelper() {

	var args = Array.prototype.slice.call( arguments, 0, arguments.length )

	var requiredCaps = _.slice( args, 0, args.length - 2 )
	var allcaps = _.slice( args, args.length-2, args.length - 1 )[0]
	var options = _.last( args )
	
	var hasPermission = (
		_.isArray( allcaps ) &&
		(
			_.contains( allcaps, "administrator" ) ||
			_.intersection( allcaps, requiredCaps ).length > 0
		)
	)
	
	return !hasPermission ? options.fn(this) : ""
}