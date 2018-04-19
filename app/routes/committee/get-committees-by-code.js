/**
 * Created by david on 3/8/16.
 */
var _                = require('lodash')
var moment           = require('moment')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var FormatRecordsSba = require('../utils/format-records-sba')
var AudienceSlugs = require('../utils/audience-slugs')

module.exports = function getCommitteesByCodeFn( app ) {

    return function getCommitteesByCode( req, res ){

        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience
        var loggedIn = true;
        if (req.session.user == undefined) {
            loggedIn = false;
        }

        /*var query = "SELECT comm.*, ((select count(comm_id) from comm co where co.custom03 = comm.name) + (select count(comm_id) from comm co where co.custom02 = comm.name)) children FROM comm WHERE comcode = '" + req.params.comcode + "'"
        if (req.query.type != undefined && req.query.type != null) {
            if (req.query.type == 'COMMITTEE') {
                // get the council as parent.
                query = "SELECT comm.*, ((select count(comm_id) from comm co where co.custom03 = comm.name) + (select count(comm_id) from comm co where co.custom02 = comm.name)) children, parent.name as parentName, parent.comcode as parentCode, parent.custom01 as parentType FROM comm JOIN comm parent ON comm.custom03 = parent.name WHERE comm.comcode = '" + req.params.comcode + "'"
            }
            if (req.query.type == 'TASKGROUP') {
                query = "SELECT comm.*, ('0') children, parent.name as parentName, parent.comcode as parentCode, parent.custom01 as parentType FROM comm JOIN comm parent ON comm.custom03 = parent.name WHERE comm.comcode = '" + req.params.comcode + "'"   
            }
        }*/
        var query = "SELECT comm.*, ((select count(comm_id) from comm co where co.custom03 = comm.name) + (select count(comm_id) from comm co where co.custom02 = comm.name)) children, grandparent.name as grandparentName, grandparent.comcode as grandparentCode, grandparent.custom01 as grandparentType, parent.name as parentName, parent.comcode as parentCode, parent.custom01 as parentType FROM comm LEFT OUTER JOIN comm grandparent ON comm.custom03 = grandparent.name LEFT OUTER JOIN comm parent ON comm.custom02 = parent.name WHERE comm.comcode = '" + req.params.comcode + "'"
        var globalResponse = {}
        // get my committees and the first set of all committees
        var promises = [
            app.sba.call({method: 'MPQuery', params: {strSQLSelect: query}}),
            app.sba.call({method: 'GetCommitteeMembers', params: {strCommitteeCode: req.params.comcode, intPageNum: 0, intItemsPerPage: 0, intBusId: 0}}),
            app.sba.call({method: 'GetCommitteeMeetings', params: {ComCode: req.params.comcode, start_date: '', end_date: ''}})
        ]

        Promise.all(promises).then(function(Responses){
            _.forEach(Responses, function(response,index){
                var options = FormatSbaDataset(response, 'data')
                if (options.GetCommitteeMembersResult != undefined || options.GetCommitteeMembersResult != null) {
                    if (options.GetCommitteeMembersResult[1].diffgram.MPDataSet != null) {
                        globalResponse.members = FormatRecordsSba(options.GetCommitteeMembersResult[1].diffgram.MPDataSet)
                    } else {
                        globalResponse.members = []
                    }
                }
                if (options.GetCommitteeMeetingsResult != undefined || options.GetCommitteeMeetingsResult != null) {
                    if (options.GetCommitteeMeetingsResult[1].diffgram.MPDataSet != null) {
                        globalResponse.meetings = FormatRecordsSba(options.GetCommitteeMeetingsResult[1].diffgram.MPDataSet)
                    } else {
                        globalResponse.meetings = []
                    }
                }
                if (options.MPQueryResult != undefined || options.MPQueryResult != null) {
                    globalResponse.committee = FormatRecordsSba([options.MPQueryResult[1].diffgram.MPDataSet])
                    globalResponse.committee = globalResponse.committee.data[0]
                }
            })
            var is_member = false
            if (globalResponse.committee.voter != undefined) {
                if (globalResponse.committee.voter || globalResponse.committee.custom10) {
                    is_member = true
                }
            }
            var is_voter = false
            if (globalResponse.committee.voter != undefined) {
                if (globalResponse.committee.voter) {
                    if (globalResponse.committee.voter == 'true') {
                        is_voter = true
                    }
                }
            }
            // remove invalid meetings: no description no valid date.
            var removed = _.remove(globalResponse.meetings.data, function(item){
                return item.meetdate.indexOf('1899-12-30T00:00:00-06:00') != -1 && item.descript.trim().length == 0
            })
            // turn meeting date to unix time(milliseconds)
            globalResponse.meetings.data = _.map(globalResponse.meetings.data, function(item){
                var meetdate = item.meetdate.substr(0,10)
                item['plaindate'] = parseInt(moment(meetdate,'YYYY-MM-DD').unix())
                if (item.meetattach.trim().length > 0) {
                    item['has_attachment'] = true
                    item['meetattach'] = item.meetattach.replace('O:','')
                    item['meetattach'] = item.meetattach.replace(/\\/g,'/')
                } else item['has_attachment'] = false
                return item
            })
            // sort meetings descending by unix time.
            globalResponse.meetings.data.sort(function(a,b) {
                return (a.plaindate - b.plaindate) * -1
            })

            res.render('committee',{
                layout         : "static",
                title          : 'Directory of Committees',
                audience       : audience,
                meetings       : globalResponse.meetings.data,
                members        : globalResponse.members.data,
                committee      : globalResponse.committee,
                is_member      : is_member,
                is_voter       : is_voter,
                loggedIn       : loggedIn,
                audienceSlug   : AudienceSlugs.toSlug(audience)
            })
        }).catch(HandleErrorsFn( req, res ))
    }
}