/**
 * Created by david on 7/18/16.
 */
var _                = require('lodash')
var moment           = require('moment');
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var AddEventIsPast      = require('../utils/event-is-past')
var AudienceSlugs = require('../utils/audience-slugs')

function _getEventDetailsFromSBA( app, intCale_ID ) {
    return app.sba.call({
        method	: 'GetEventDetails',
        params: {
            intCale_ID: intCale_ID
        }
    })
}

function _processReceivedEvent( locals, callResponse ) {

    var event = FormatSbaDataset(
        callResponse,
        'data.GetEventDetailsResponse.GetEventDetailsResult[1].diffgram.MPDataSet'
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

module.exports = function singleEventIcsRouteFn( app ) {

    return function singleEventIcsRoute( req, res ) {
        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

        Promise.resolve()

            .then( _getEventDetailsFromSBA .bind(null, app, req.params.id))
            .then( _processReceivedEvent   .bind(null, res.locals))
            .then( _fetchAttendees         .bind(null, app, res.locals))

            .then(function( event ) {

                var startdate = res.locals.event.startdate.split("T");
                var enddate = res.locals.event.enddate.split("T");
                var begin = moment(startdate[0], 'YYYY-MM-DD').format('YYYYMMDD')
                var end = moment(enddate[0], 'YYYY-MM-DD').add(1,'days').format('YYYYMMDD')
                res.format({
                    'text/calendar' : function () {
                        res.send("BEGIN:VCALENDAR\r\n"+
                        "VERSION:2.0\r\n"+
                        "BEGIN:VEVENT\r\n"+
                        "CLASS:PUBLIC\r\n"+
                        "DESCRIPTION:AAMA - "+res.locals.event.event+"\r\n"+
                        "DTSTART;VALUE=DATE:"+begin+"\r\n"+
                        "DTEND;VALUE=DATE:"+end+"\r\n"+
                        "LOCATION:"+res.locals.event.location+"\r\n"+
                        "SUMMARY;LANGUAGE=en-us:AAMA - "+res.locals.event.event+"\r\n"+
                        "TRANSP:TRANSPARENT\r\n"+
                        "END:VEVENT\r\n"+
                        "END:VCALENDAR")
                    }
                })
            })
            .catch(HandleErrorsFn( req, res ));

    }
}