var _ = require('lodash')

module.exports = function addEventIsPast( event ) {
	var end = (new Date(event.enddate)).getTime() + 86400000
	var now = Date.now()
	var isPast = end < Date.now()
	
	return _.assign( {}, event, {
		isPast : isPast
	})
}