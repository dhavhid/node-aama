var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var CategoryCodes    = require('../utils/category-codes')
var Moment           = require('moment')
var AddEventIsPast   = require('../utils/event-is-past')
var AudienceSlugs = require('../utils/audience-slugs')

/*
Example event
{ cale_id: '7',
  event: '2003 National 66th Annual Meeting',
  startdate: '2003-02-02T00:00:00-06:00',
  enddate: '2003-02-06T00:00:00-06:00',
  location: 'Sheraton Maui Kaanapali Beach Resort',
  cancelled: 'false',
  onlinereg: 'true',
  descript: '',
  webbrief: '',
  eventdiv: '',
  category: '',
  starttime: '',
  mfun_function: '2003ANNUAL',
  mfun_funcgrp: 'NATIONAL',
  webregends: '2003-01-24T00:00:00-06:00',
  webregmo: 'true',
  capacity: '1000' }
*/

module.exports = function postsRouteFn( app ) {
	
	return function postsRoute( req, res ) {

		var audience = req.session.audience
		audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience
		
		var categoryCode = CategoryCodes.slugToCode( req.params.category )
		var categoryName = CategoryCodes.toName( categoryCode )
		
		if( req.params.category && !categoryCode ) {
			return res.send(404)
		}
		
		app.sba.call({
			method	: 'EventSearch',
			// attributes: {
			//	 xmlns: 'http://www.sample.com'
			// },
			params: {
				strCaleWhere: '',
				strDivision: '',
				strCategory: categoryCode,
				strEventName: '',	
				strStartDate: '12/31/2013',
				strEndDate: '12/31/2050',
				intPageNum: 0,
				intItemsPerPage: 0
			}
		})
		.then((callResponse) => {
			
			var events = FormatSbaDataset(
				callResponse,
				'data.EventSearchResponse.EventSearchResult[1].diffgram.MPDataSet'
			)
			events.reverse()
			
			if( _.isArray( events ) ) {
				
				events = _.map(events, function eventIsInPast( event ) {
					var end = (new Date(event.enddate)).getTime() + 86400000
					var now = Date.now()
					event.inPast = end < Date.now()
					return event
				})
				
				res.render('events', {
					layout: "blog",
					title: "AAMA Events",
					events: events.map( AddEventIsPast ),
					category: CategoryCodes.toName( categoryCode ),
					audience: audience,
					audienceSlug: AudienceSlugs.toSlug(audience),
				})

			} else {
				return "Could not get events from the database."
			}
			
		})
		.catch(HandleErrorsFn( req, res ));

	}
}