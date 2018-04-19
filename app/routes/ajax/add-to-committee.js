/**
 * Created by david on 1/07/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')

module.exports = function addToCommitteRouteFn( app ) {

    return function addToCommitteeRoute( req, res) {
        if (req.session.user == undefined) {
            res.status(401).json({message: 'You need to be logged in to see this content.'})
            return
        }
        app.sba.call({
            method: 'AddIndividualToCommittee',
            params: {
                intRepId: req.session.user.intRepID,
                strComCode: req.body.strComCode
            }
        }).then((callResponse) => {

            var options = FormatSbaDataset(
                callResponse,
                'data'
            )

            res.json({
                response: options
            })
        }).catch(HandleErrorsFn( req, res ));
    }
}