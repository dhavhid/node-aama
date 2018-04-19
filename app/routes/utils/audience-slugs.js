var _ = require('lodash')

var audienceCodes = {
	"manufacturers-members" : "Manufacturers & Members (MM)",
	"architects-professionals" : "Architects & Professionals (AP)",
	"builders-contractors" : "Builders & Contractors (BC)",
	"homeowners" : "Homeowners (HO)"
}

exports.toName = function( slug ) {
	return audienceCodes[slug] ? audienceCodes[slug] : ''
}

exports.toSlug = function( name ) {
	
	var slug
	
	_.each( audienceCodes, function( value, key ) {
		if( name === value ) {
			slug = key
		}
	})
	
	return slug ? slug : ''
}