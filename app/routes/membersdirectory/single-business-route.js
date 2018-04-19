/**
 * Created by david on 2/12/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var FormatRecordsSba = require('../utils/format-records-sba')
var CategoryCodes    = require('../utils/category-codes')
var AudienceSlugs    = require('../utils/audience-slugs')
var moment           = require('moment')

function _getMainRep(individuals)
{
    var mainRep = {}
    if (Array.isArray(individuals)) {
        _.forEach(individuals, function(individual, index){
            if (individual.repr_stat == 'M') {
                mainRep = individual
            }
        })
    }
    return mainRep
}

module.exports = function singleBusinessRouteFn( app )
{
    return function singleBusinessRoute( req, res) {
        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience
        if (isNaN(req.params.id) || req.params.id == undefined){
            res.redirect('/members')
            return
        }
        var loggedIn = false
        var user = {}
        var allowEditBusiness = false
        if (req.session.user != undefined) {
            loggedIn = true
            user = req.session.user
        }
        var globalResult = {business:{}, individuals:{}, events: [], programs: [], cfm: [], cfa: []}
        var query = []
        var mpquery = "Select cale.cale_id as EventID, mfun.descript as EventName, acce.descript as AcessoryName, memb.weblogourl from PART Join PAAC on paac.part_id=part.part_id join memb on memb.id=part.id join acce on acce.access_cd=paac.access_cd and acce.function==part.function join mfun on mfun.function==part.function join cale on cale.function==part.function where acce.sponsor and part.id=" + req.params.id
        var promises = [
            app.sba.call({method: 'GetBusinessInfo', params: {int_Id: req.params.id}}),
            app.sba.call({method: 'GetIndividuals', params: {intMembID: req.params.id}}),
            app.sba.call({method: 'MPQuery', params: {strSQLSelect: mpquery}}),
            app.sba.call({method: 'MPQuery', params: {strSQLSelect: "Select * from pclo where id = " + req.params.id}}),
            app.sba.call({method: 'MPQuery', params: {strSQLSelect: "select custom09, end_date, start_date, fname, mi, lname, primry_grp, second_grp, title, rep_id from grps where  primry_grp = 'CFM' and id = " + req.params.id}}),
            app.sba.call({method: 'MPQuery', params: {strSQLSelect: "select custom09, end_date, start_date, fname, mi, lname, primry_grp, second_grp, title, rep_id from grps where  primry_grp = 'CFA' and id = " + req.params.id}})
        ]

        Promise.all(promises).then(function(responses){
            _.forEach(responses, function(response, index){
                var parsedResponse = FormatSbaDataset(response, 'data')
                if (parsedResponse.GetBusinessInfoResult != undefined) {
                    if (parsedResponse.GetBusinessInfoResult[0]._Memb_Id == 0) {
                        res.render('business', {
                            layout       : "static",
                            title        : 'Not Found',
                            error        : 'The business you are looking for does not exists.',
                            audience     : audience,
                            audienceSlug : AudienceSlugs.toSlug(audience),
                        })
                    } else {
                        globalResult.business = FormatRecordsSba([{'Record': parsedResponse.GetBusinessInfoResult}])
                    }
                } else if (parsedResponse.GetIndividualsResult != null) {
                    if (!Array.isArray(parsedResponse.GetIndividualsResult[1].diffgram.MPDataSet)) {
                        var ind = [parsedResponse.GetIndividualsResult[1].diffgram.MPDataSet]
                    } else var ind = parsedResponse.GetIndividualsResult[1].diffgram.MPDataSet
                    globalResult.individuals = FormatRecordsSba(ind)
                    // now get rid of people with Products in its name.
                    _.remove(globalResult.individuals.data, function(o) {
                        return o.fname.indexOf('Publications') != -1 || o.lname.indexOf('Publications') != -1
                    })

                } else if (parsedResponse.MPQueryResult != null) {
                    var opt = []
                    if (parsedResponse.MPQueryResult[1].diffgram != '') {
                        if (!Array.isArray(parsedResponse.MPQueryResult[1].diffgram.MPDataSet)) {
                            parsedResponse.MPQueryResult[1].diffgram.MPDataSet = [parsedResponse.MPQueryResult[1].diffgram.MPDataSet]
                        }
                        opt = FormatRecordsSba(parsedResponse.MPQueryResult[1].diffgram.MPDataSet)
                        _.forEach(opt.data, function(item, i) {
                            query.push(item)
                        })
                    }
                }
            })
            
            // parse events and programs.
            var today = moment()
            _.forEach(query, function(data, index) {
                if (data.eventid != undefined) {
                    globalResult.events.push(data)
                } else if (data.awsstatus != undefined) {
                    // check one by one if active and not resigned.
                    if (data.awsstatus == 'A' && data.awsresign == '1899-12-30T00:00:00-06:00') {
                        globalResult.programs.push({programName: "Air-Water-Structural"})
                    }
                    if (data.thnfstatus == 'A' && data.thnfresign == '1899-12-30T00:00:00-06:00') {
                        globalResult.programs.push({programName: "Th-NFRC"})
                    }
                    if (data.mhstatus == 'A' && data.mhresign == '1899-12-30T00:00:00-06:00') {
                        globalResult.programs.push({programName: "MH"})
                    }
                    if (data.pflstatus == 'A' && data.pflresign == '1899-12-30T00:00:00-06:00') {
                        globalResult.programs.push({programName: "Profile"})
                    }
                    if (data.vclstatus == 'A' && data.vclresign == '1899-12-30T00:00:00-06:00') {
                        globalResult.programs.push({programName: "VCL"})
                    }
                    if (data.fslstatus == 'A' && data.fslresign == '1899-12-30T00:00:00-06:00') {
                        globalResult.programs.push({programName: "Full Service Lab"})
                    }
                    if (data.clstatus == 'A' && data.clresign == '1899-12-30T00:00:00-06:00') {
                        globalResult.programs.push({programName: "Component Lab"})
                    }
                    if (data.cmastatus == 'A' && data.cmaresign == '1899-12-30T00:00:00-06:00') {
                        globalResult.programs.push({programName: "CMA (NFRC 705)"})
                    }
                    if (data.nsbstatus == 'A' && data.nsbresign == '1899-12-30T00:00:00-06:00') {
                        globalResult.programs.push({programName: "NFRC Site Built"})
                    }
                } else {
                    var enddate = data.custom09.split("T")
                    var startdate = data.start_date.split("T")
                    enddate = moment(enddate[0],'YYYY-MM-DD')
                    startdate = moment(startdate[0],'YYYY-MM-DD')
                    if ((data.primry_grp == 'CFM' || data.second_grp == 'CFM') && today.isBetween(startdate, enddate)) {
                        globalResult.cfm.push(data)
                    }
                    if ((data.primry_grp == 'CFA' || data.second_grp == 'CFA') && today.isBetween(startdate, enddate)) {
                        globalResult.cfa.push(data)
                    }
                }
            })
            // remove duplicates in the programs array.
            globalResult.programs = _.uniq(globalResult.programs, 'programName')
            // remove duplicates in CFM
            globalResult.cfm = _.uniq(globalResult.cfm, 'rep_id')
            // remove duplicates in CFA
            globalResult.cfa = _.uniq(globalResult.cfa, 'rep_id')

            var mainRep = _getMainRep(globalResult.individuals.data)
            var title = globalResult.business.data[0].Name
            if (globalResult.business.data[0].Custom17 == 'PT') {
                if (mainRep.fname != null && mainRep.lname != null) {
                    title = globalResult.business.data[0].Name + ' - ' + mainRep.fname + ' ' + mainRep.lname
                }
            }
            if (user.intRepID != null) {
                if (parseInt(mainRep.rep_id) == parseInt(user.intRepID)) {
                    allowEditBusiness = true
                }
            }
            
            res.render('business', {
                layout            : "static",
                title             : title,
                business          : globalResult.business.data[0],
                mainRep           : mainRep,
                members           : globalResult.individuals.data,
                totalMembers      : globalResult.individuals.data.length,
                events            : globalResult.events,
                totalEvents       : globalResult.events.length,
                programs          : globalResult.programs,
                totalPrograms     : globalResult.programs.length,
                cfa               : globalResult.cfa,
                totalCFA          : globalResult.cfa.length,
                cfm               : globalResult.cfm,
                totalCFM          : globalResult.cfm.length,
                loggedIn          : loggedIn,
                allowEditBusiness : allowEditBusiness,
                error             : false,
                audience          : audience,
                audienceSlug      : AudienceSlugs.toSlug(audience),
            })
        }).catch(HandleErrorsFn( req, res ))
    }
}
