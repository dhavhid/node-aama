/**
 * Created by david on 3/7/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var FormatRecordsSba = require('../utils/format-records-sba')
var AudienceSlugs = require('../utils/audience-slugs')

module.exports = function ajaxGetCommitteesRouteFn( app ) {

    return function ajaxGetCommitteesRoute( req, res ){

        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience
        var globalResponse = {}
        // get my committees and the first set of all committees
        var promises = [
            app.sba.call({method: 'GetCommittees', params: {intPageNum: parseInt(req.params.page), intItemsPerPage: 15}})
        ]

        Promise.all(promises).then(function(Responses){
            _.forEach(Responses, function(response,index){
                var options = FormatSbaDataset(response, 'data')
                if (options.GetCommitteesResult != undefined || options.GetCommitteesResult != null) {
                    globalResponse = FormatRecordsSba(options.GetCommitteesResult[1].diffgram[0].NewDataSet)
                }
            })

            var removed = _.remove(globalResponse.data, function(item){
                return item.name.indexOf('z Disbanded') != -1 ||
                    item.name.indexOf('zDisbanded') != -1 ||
                    item.name.indexOf('z disbanded') != -1 ||
                    item.name.indexOf('zdisbanded') != -1 ||
                    item.cominact.indexOf('1899-12-30T00:00:00-06:00') == -1
            })
            res.status(200).send(globalResponse)
        }).catch(HandleErrorsFn( req, res))
    }
}