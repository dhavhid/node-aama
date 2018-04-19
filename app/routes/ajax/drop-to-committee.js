/**
 * Created by david on 3/17/16.
 */
/**
 * Created by david on 1/07/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var moment           = require('moment')

module.exports = function dropToCommitteRouteFn( app ) {

    return function dropToCommitteeRoute( req, res) {
        if (req.session.user == undefined) {
            res.status(401).json({message: 'You need to be logged in to see this content.'})
            return
        }
        var params = {
            intRepId: parseInt(req.session.user.intRepID),
            strComcode: req.body.strComCode,
            strDateOff: moment().format('MM/DD/YYYY')
        }
        app.sba.call({
            method: 'DropIndividualCommittee',
            params: params
        }).then((callResponse) => {

            var options = FormatSbaDataset(
                callResponse,
                'data'
            )
            res.json({response: options})
    }).catch(HandleErrorsFn(res));
    }
}