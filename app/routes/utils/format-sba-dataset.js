var _ = require('lodash')

function mapRecord( recordEntry ) {
	
	/*
		Record entry looks like this: {
			Record : [
				{ "cale_id" : "7" },
				{ "event" : "2003 National 66th Annual Meeting",
				...
			]
		}

		Transform into:	{
			"cale_id" : "7",
			"event" : "2003 National 66th Annual Meeting"
		}
	*/
	
	// Don't trust the API
	var record = _.get( recordEntry, 'Record')
	
	// Some aren't stored in a record
	if( !record ) {
		record = recordEntry
	}
	
	// Reduce the result into the above value
	return _.reduce( record, function( memo, row ) {
		_.each( row, function( value, key ) {
			memo[key] = _.isString( value ) ? value.trim() : value
		})
		return memo
	}, {})
}

module.exports = function mapSbaDataset( callResponse, keyPath, forceSingle ) {
	
	var dataSet = _.get( callResponse, keyPath )
	
	// The API calls can map to either a single record or an array of records
	if( !forceSingle && _.isArray( dataSet ) ) {
		return _.map(dataSet, mapRecord)
	} else {
		return mapRecord( dataSet )
	}
}