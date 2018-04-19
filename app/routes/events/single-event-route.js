var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var AddEventIsPast      = require('../utils/event-is-past')
var AudienceSlugs = require('../utils/audience-slugs')

var exampleEvent = {
  address: '721 Pine Street',
  agenda: '<DIV style="FONT-FAMILY: Arial"> ... </DIV>',
  approved: 'true',
  app_email: '',
  app_name: '',
  app_phone: '',
  cale_id: '119',
  canceldate: '1899-12-30T00:00:00-06:00',
  cancelled: 'false',
  cancelnote: '',
  category: '',
  city: 'Seattle',
  contact: 'Kaydeen Laird',
  custom01: '',
  custom02: '',
  custom03: '',
  custom04: '0.00',
  custom05: '0.00',
  custom06: '0.00',
  custom07: '1899-12-30T00:00:00-06:00',
  custom08: '1899-12-30T00:00:00-06:00',
  custom09: '1899-12-30T00:00:00-06:00',
  custom10: '',
  custom11: '',
  custom12: '',
  custom13: '',
  custom14: '',
  custom15: '',
  datecreate: '2015-03-24T14:34:53-05:00',
  dateupdate: '2015-05-04T09:37:22-05:00',
  dept: 'MTGS',
  descript: '<DIV align=left> ... </DIV>',
  enddate: '2015-07-02T00:00:00-05:00',
  endtime: '',
  event: 'Western Region 2015 Summer Summit',
  eventdiv: '',
  event_img: '',
  fee: 'false',
  function: '2015WRSUMMER',
  id: '0',
  import_id: '119',
  infoemail: 'klaird@aamanet.org',
  infoext: '223',
  infofax: '8473035774',
  infophone: '8473035859',
  infourl: '',
  location: 'Grand Hyatt Seattle',
  loc_hca: 'false',
  loc_logo: '',
  loc_maxatt: '0',
  loc_park: '',
  loc_phone: '',
  loc_room: '',
  loc_url: '',
  noexp2web: 'false',
  notes: '',
  onlinereg: 'true',
  org_name: '',
  spk_comp: '',
  spk_email: '',
  spk_name: '',
  spon1logo: '',
  spon1name: '',
  spon1url: '',
  spon2logo: '',
  spon2name: '',
  spon2url: '',
  spon3logo: '',
  spon3name: '',
  spon3url: '',
  spon4logo: '',
  spon4name: '',
  spon4url: '',
  startdate: '2015-07-01T00:00:00-05:00',
  starttime: '',
  state: 'WA',
  subcat: '',
  topic: '',
  usercreate: 'KLAIRD',
  userupdate: 'KLAIRD',
  webbrief: '',
  webmapl: '0',
  webmapover: 'false',
  webremup: '2011-01-10T15:37:56-06:00',
  webuser_id: '0',
  zip: '98101',
  quickreg: 'false',
  app_url: '',
  spk_url: '',
  spon1id: '0',
  spon2id: '0',
  spon3id: '0',
  spon4id: '0',
  catlist: '',
  mfun_function: '2015WRSUMMER',
  mfun_funcgrp: 'AAMA_AM',
  webregends: '2015-06-19T00:00:00-05:00',
  webregmo: 'true',
  mfun_id: '2014',
  date_reg2: '1899-12-30T00:00:00-06:00',
  date_reg3: '1899-12-30T00:00:00-06:00',
  membcost: '250.00',
  membcost2: '0.00',
  membcost3: '0.00',
  nonmemcost: '250.00',
  nonmemcst2: '0.00',
  nonmemcst3: '0.00',
  webmemdisc: '0.00',
  webnondisc: '0.00',
  webgstdisc: '0.00',
  webnoeditp: 'false'
}

function _getEventDetailsFromSBA( app, intCale_ID ) {
	return app.sba.call({
		method	: 'MPQuery',
		params: {
            'strSQLSelect' : 'select cale.*, mfun.mfun_id, mfun.date_reg2, mfun.date_reg3, mfun.membcost, mfun.membcost2, mfun.membcost3, mfun.nonmemcost, mfun.nonmemcst2, mfun.nonmemcst3, mfun.webmemdisc, mfun.webnondisc, mfun.webgstdisc, mfun.webnoeditp from cale join mfun on cale.function = mfun.function where cale_id = ' + intCale_ID
        }
	})
}

function _processReceivedEvent( locals, callResponse ) {

	var event = FormatSbaDataset(
		callResponse,
		'data.MPQueryResponse.MPQueryResult[1].diffgram.MPDataSet'
	)
	
	if( _.isObject( event ) ) {
		locals.event = AddEventIsPast(event)
		return Promise.resolve(event)
	} else {
		return Promise.reject("Could not get events from the database.")
	}
}

function _fetchAttendees( app, locals, event ) {
	return app.sba.call({
		method : 'GetEventAttendees',
		params : {
			strFunc: event.mfun_function
		}
	}).then(function( response ) {
		
		locals.attendees = FormatSbaDataset(
			response,
			'data.GetEventAttendeesResponse.GetEventAttendeesResult[1].diffgram.MPDataSet'
		)
	})
}

module.exports = function postsRouteFn( app ) {
	
	return function postsRoute( req, res ) {
    var audience = req.session.audience
    audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

        Promise.resolve()
		
		.then( _getEventDetailsFromSBA .bind(null, app, req.params.id))
		.then( _processReceivedEvent   .bind(null, res.locals))
		.then( _fetchAttendees         .bind(null, app, res.locals))
		
		.then(function( event ) {

      var loggedIn = true
      if (req.session.user == undefined) {
          loggedIn = false
      }
      if (req.session.user != undefined) {
        if (req.session.user.strMembStatus != 'A') {
          loggedIn = false
        }
      } 
			res.render('event', _.assign( res.locals, {
				layout: "blog",
				title: "AAMA Events",
                audience: audience,
                audienceSlug: AudienceSlugs.toSlug(audience),
                loggedIn: loggedIn
			}))
		})
		.catch(HandleErrorsFn( req, res ));

	}
}