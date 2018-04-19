var _ = require('lodash')

var codes = {
	W : "Western Region",
	A : "AAMA",
	I : "Industry",
	S : "Southeast Region",
	N : "National",
}

var slugs = {
	"western-region" : 'W',
	"aama" : 'A',
	"industry" : 'I',
	"southeast-region" : 'S',
	"national" : 'N',
}

exports.toName = function( code ) {
	return codes[code] ? codes[code] : ''
}

exports.toCode = function( name ) {
	
	var code
	
	_.each( codes, function( value, key ) {
		if( name === value ) {
			code = key
		}
	})
	
	return code ? code : ''
}

exports.slugToCode = function( slug ) {
	return slugs[slug] ? slugs[slug] : ''
}

exports.codeToSlug = function( code ) {
	
	var slug
	
	_.each( slugs, function( value, key ) {
		if( code === value ) {
			slug = key
		}
	})
	
	return slug ? slug : ''
}