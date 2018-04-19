/**
 * Created by david on 1/7/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var FormatRecordsSba = require('../utils/format-records-sba')
var AudienceSlugs = require('../utils/audience-slugs')

module.exports = function getCommitteesFn( app ) {

    return function getCommitteesRoute( req, res ){

        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience
        if (req.session.user == undefined) {
            return res.render('committees',{
                layout          : "static",
                title           : 'Directory of Committees',
                audience        : audience,
                error           : true,
                intMyCommittees : 0,
                message         : 'You need to be logged in to see this content.',
                audienceSlug    : AudienceSlugs.toSlug(audience)
            })
        }
        var globalResponse = {}
        // get my committees and the first set of all committees
        var promises = [
            app.sba.call({method: 'GetIndividualsCommittees', params: {intRepId: req.session.user.intRepID}})
        ]

        Promise.all(promises).then(function(Responses){
            _.forEach(Responses, function(response,index){
                var options = FormatSbaDataset(response, 'data')
                if (options.GetIndividualsCommitteesResult != undefined || options.GetIndividualsCommitteesResult != null) {
                    globalResponse = FormatRecordsSba(options.GetIndividualsCommitteesResult[1].diffgram.MPDataSet)
                }
            })

            var removed = _.remove(globalResponse.data, function(item){
                return item.name.indexOf('z Disbanded') != -1 ||
                    item.name.indexOf('zDisbanded') != -1 ||
                    item.name.indexOf('z disbanded') != -1 ||
                    item.name.indexOf('zdisbanded') != -1 ||
                    item.date_off.indexOf('1899-12-30T00:00:00-06:00') == -1
            })
            
            res.render('committees',{
                layout         : "static",
                title          : 'Directory of Committees',
                audience       : audience,
                MyCommittees   : globalResponse.data,
                intMyCommittees: globalResponse.data.length,
                audienceSlug   : AudienceSlugs.toSlug(audience)
            })
        }).catch(HandleErrorsFn( req, res ))
    }
}