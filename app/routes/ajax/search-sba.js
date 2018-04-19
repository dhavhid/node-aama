/**
 * Created by david on 2/10/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')

function _parseBusinessResults(resultSet)
{
    var _parsedResults = []
    if (_.isArray(resultSet) == false) {
        resultSet = [resultSet]
    }
    _.forEach(resultSet, function(item, index){
        _parsedResults.push({
            id           : item.Record[0].id,
            name         : item.Record[1].name,
            membstatus   : item.Record[3].membstatus,
            joined       : item.Record[4].joined,
            main_rep     : item.Record[94].MainRep,
            phone        : item.Record[95].phone1,
            email        : item.Record[102].email,
            url          : item.Record[104].url,
            address1     : item.Record[105].mail_address1,
            address2     : item.Record[106].mail_address2,
            city         : item.Record[107].mail_city,
            state        : item.Record[108].mail_state,
            zip          : item.Record[109].mail_zip,
            busdescript  : item.Record[122].busdescript
        })
    })
    return _parsedResults
}

function _parseEventResults(resultSet)
{
    var _parsedResults = []
    if (_.isArray(resultSet) == false) {
        resultSet = [resultSet]
    }
    _.forEach(resultSet, function(item, index){
        _parsedResults.push({
            id         : item.Record[0].cale_id,
            name       : item.Record[1].event,
            startdate  : item.Record[2].startdate,
            enddate    : item.Record[3].enddate,
            location   : item.Record[4].location,
            capacity   : item.Record[16].capacity
        })
    })
    return _parsedResults
}

function _parseIndResults(resultSet, term)
{
    var _parsedResults = []
    if (_.isArray(resultSet) == false) {
        resultSet = [resultSet]
    }
    _.forEach(resultSet, function(item, index){
        if ((item.Record[1].fname.toLowerCase().indexOf(term) != -1 ||
            item.Record[3].lname.toLowerCase().indexOf(term) != -1) &&
            _.find(_parsedResults,function(o){ return o.repId == item.Record[5].rep_id }) == undefined
        ) {
            _parsedResults.push({
                repId     : item.Record[5].rep_id,
                membId    : item.Record[5].id,
                firstname : item.Record[1].fname,
                lastname  : item.Record[3].lname,
                title     : item.Record[9].title,
                email     : item.Record[12].email,
                phone     : item.Record[23].phone1,
                address1  : item.Record[15].mail_address1,
                address2  : item.Record[16].mail_address2,
                city      : item.Record[17].mail_city,
                state     : item.Record[18].mail_state,
                zip       : item.Record[19].mail_zip
            })
        }
    })
    return _parsedResults
}

module.exports = function ajaxSearchRouteFn( app ) {

    return function ajaxSearchRoute( req, res ) {

        if (req.session.user == undefined) {
            res.status(401).json({message: 'You need to be logged in to see this content.'})
            return
        }

        var globalResponse = {events: {}, business: {}}
        var businessParams = {
            strAllAnyExact        : req.body.strAllAnyExact,
            strSearchType         : req.body.strSearchType,
            intPageNum            : 0,
            intItemsPerPage       : 0,
            strKeywords           : req.body.term,
            strKWWhere            : '',
            strBusinessStatus     : '',
            OverRideSortByWebSort : false
        }
        if (req.body.strSearchType == 'CustWhere') {
            businessParams.strKWWhere = req.body.term
        }

        var eventParams = {
            strCaleWhere    : '',
            strDivision     : req.body.strDivision,
            strCategory     : req.body.strCategory,
            strEventName    : req.body.term,
            strStartDate    : req.body.strStartDate,
            strEndDate      : req.body.strEndDate,
            intPageNum      : 0,
            intItemsPerPage : 0
        }

        var promises = [
            app.sba.call({method: 'BusinessSearch', params: businessParams}),
            app.sba.call({method: 'EventSearch', params: eventParams}),
            app.sba.call({method: 'GetIndividuals', params: {intMembID: parseInt(req.session.user.intMembID)}})
        ]

        Promise.all(promises).then(function(responses){
            _.forEach(responses, function(response, index){
                var parsedResponse = FormatSbaDataset(response, 'data')
                if (parsedResponse.BusinessSearchResult != undefined) {
                    if (parsedResponse.BusinessSearchResult[1].diffgram != '') {
                        globalResponse.business = _parseBusinessResults(parsedResponse.BusinessSearchResult[1].diffgram.MPDataSet)
                        if (globalResponse.business.length == 0) {
                            globalResponse.business = {}
                        }
                    }
                }
                if (parsedResponse.EventSearchResult != undefined) {
                    if (parsedResponse.EventSearchResult[1].diffgram != '') {
                        globalResponse.events = _parseEventResults(parsedResponse.EventSearchResult[1].diffgram.MPDataSet)
                        if (globalResponse.events.length == 0) {
                            globalResponse.events = {}
                        }
                    }
                }
                if (parsedResponse.GetIndividualsResult != undefined) {
                    if (parsedResponse.GetIndividualsResult.diffgram != '') {
                        globalResponse.individuals = _parseIndResults(parsedResponse.GetIndividualsResult[1].diffgram.MPDataSet, req.body.term.toLowerCase().trim())
                        if (globalResponse.individuals.length == 0) {
                            globalResponse.individuals = {}
                        }
                    }
                }
            })
            res.send(globalResponse)
        }).catch(HandleErrorsFn( req, res ));
    }
}