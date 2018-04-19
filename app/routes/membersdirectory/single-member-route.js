/**
 * Created by david on 2/12/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var FormatRecordsSba = require('../utils/format-records-sba')
var CategoryCodes    = require('../utils/category-codes')
var AudienceSlugs    = require('../utils/audience-slugs')

module.exports = function singleMemberRouteFn( app )
{
    return function singleMemberRoute( req, res) {
        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

        if (isNaN(req.params.id) || req.params.id == undefined){
            res.redirect('/members')
            return
        }

        var loggedIn = false
        if (req.session.user != undefined) {
            loggedIn = true
        }
        var individual = {}
        var mpdlookup = {}

        // query the MPDLookUp for picture.
        var promises = [
            app.sba.call({method: 'GetIndividualInfo', params: {intRep_Id: req.params.id}}),
            app.sba.call({method: 'MPDLookUp', params: {strTable: 'repr', strField: 'webpict', strWhere: 'rep_ID=' + req.params.id}}),
        ]

        Promise.all(promises).then(function(Responses){
            _.forEach(Responses, function(response, index) {
                var options = FormatSbaDataset(response,'data');
                if (options.GetIndividualInfoResult != undefined) {
                    individual = FormatRecordsSba([{'Record': options.GetIndividualInfoResult}])
                }
                if (options.MPDLookUpResult != undefined) {
                    mpdlookup = options.MPDLookUpResult
                }
            })
            res.render('member', {
                layout       : "static",
                title        : 'Members Directory',
                profile      : individual.data[0],
                mpdlookup    : mpdlookup,
                loggedIn     : loggedIn,
                audience     : audience,
                audienceSlug : AudienceSlugs.toSlug(audience)
            })
        }).catch(HandleErrorsFn( req, res ))
    }
}
