var _ = require('lodash')

function getCount( listOrNumber ) {
	
	if( _.isArray(listOrNumber) ) {
		
		return listOrNumber.length
		
	} else if( _.isNumber(listOrNumber) ) {
		
		return listOrNumber
		
	} else {
		
		return 0
	}
}

module.exports = function( listOrNumber, singular, plural ) {
	
	plural = _.isString( plural ) ? plural : singular + "s"
	
	var count = getCount( listOrNumber )
	var text = (count === 1) ? singular : plural
	
	return count + " " + text
}