/**
 * Created by david on 4/25/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var FormatRecordsSba = require('../utils/format-records-sba')
var AudienceSlugs    = require('../utils/audience-slugs')

module.exports = function getLabStandardsRouteFn( app )
{
    return function getLabStandardsRoute( req, res ) {

        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

        //get parameters.
        var pclo_id = req.params.pcloid
        var query = "Select pcyr.descript, pcyr.cert_type, pcyr.cert_start, pcyr.cert_end, pcyr.pclo_id from PCYR where pcyr.pclo_id = " + pclo_id

        app.sba.call({
            method: 'MPQuery',
            params: {
                strSQLSelect: query
            }
        }).then((Response) => {
            var options = FormatSbaDataset(Response, 'data')

            if (!Array.isArray(options.MPQueryResult[1].diffgram.MPDataSet)) {
                options.MPQueryResult[1].diffgram.MPDataSet = [options.MPQueryResult[1].diffgram.MPDataSet]
            }
            options = FormatRecordsSba(options.MPQueryResult[1].diffgram.MPDataSet)
            res.send(options.data)
    }).catch(HandleErrorsFn(req, res))
    }
}