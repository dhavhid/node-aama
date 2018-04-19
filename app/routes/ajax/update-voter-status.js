/**
 * Created by david on 3/18/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var FormatRecordsSba = require('../utils/format-records-sba')
var AudienceSlugs = require('../utils/audience-slugs')

module.exports = function updateVoterStatus( app )
{
    return function updateVoterStatus( req, res ) {
        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

        if (req.session.user == undefined) {
            res.render('committees',{
                layout        : "static",
                title         : 'Directory of Committees',
                audience      : audience,
                error         : true,
                message       : 'You need to be logged in to see this content.',
                audienceSlug  : AudienceSlugs.toSlug(audience)
            })
            return
        }
        var globalResult = {}
        var response = false;
        var promises = [
            app.sba.call({method: 'UpdateCommitteeCustom10', params: {intMcom_Id: parseInt(req.body.intMcom_Id), Custom10_YorN: req.body.Custom10_YorN}}),
            app.sba.call({method: 'UpdateCommitteeVOTE', params: {intMcom_Id: parseInt(req.body.intMcom_Id), Vote_TorF: req.body.Vote_TorF}})
        ]

        Promise.all(promises).then(function(Responses){
            _.forEach(Responses, function(response, index){
                var options = FormatSbaDataset(response, 'data')
                if (options.UpdateCommitteeCustom10Result != null) {
                    globalResult.custom10 = options.UpdateCommitteeCustom10Result
                }
                if (options.UpdateCommitteeVOTEResult != null) {
                    globalResult.voter = options.UpdateCommitteeVOTEResult
                }

            })
            if (globalResult.custom10 == 'Success' && globalResult.voter == 'Success') {
                response = true
            }
            res.send(response)
        }).catch(HandleErrorsFn(res))
    }
}