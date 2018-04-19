/**
 * Created by david on 7/12/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var FormatRecordsSba = require('../utils/format-records-sba')
var AudienceSlugs = require('../utils/audience-slugs')

module.exports = function getCommitteesByHierarchyFn( app ) {

    return function getCommitteesByHierarchyRoute(req, res) {

        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

        /*if (req.session.user == undefined) {
            res.send({'message': 'You need to be logged in to see this content.'})
            return
        }*/
        // get the top hierarchy committees
        var query = "SELECT * FROM comm WHERE custom01 = '" + req.params.hierarchy.toUpperCase() + "';"
        if (req.query.parent != null && req.query.parent != undefined) {
            // get the children of a given committee
            if (req.query.parent.trim().length > 0) {
                query = "SELECT * FROM comm WHERE custom03 = '" + decodeURI(req.query.parent) + "' OR custom02 = '" + decodeURI(req.query.parent) + "';"
            }
        }

        app.sba.call({
            method: "MPQuery",
            params: {
                strSQLSelect: query
            }
        }).then((callResponse) => {
            var options = FormatSbaDataset(callResponse, 'data')

            options = FormatRecordsSba(options.MPQueryResult[1].diffgram.MPDataSet)
            res.send(options)
        }).catch(HandleErrorsFn( req, res ))
    }
}