/**
 * Created by david on 1/07/16.
 */
var HandleErrorsFn = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')

module.exports = function getCommitteMeetingsRouteFn( app ) {

    return function getCommitteeMeetingsRoute( req, res) {
        if (req.session.user == undefined) {
            res.status(401).json({message: 'You need to be logged in to see this content.'})
            return
        }

        app.sba.call({
            method: 'GetCommitteeMeetings',
            params: {
                ComCode: req.params.comCode,
                start_date: '',
                end_date: ''
            }
        }).then((callResponse) => {

            var options = FormatSbaDataset(
                callResponse,
                'data.GetCommitteeMeetingsResponse.GetCommitteeMeetingsResult'
            )

            res.json({
            meetings: options[1].MPDataSet
        })
    }).catch(HandleErrorsFn( req, res ));
    }
}