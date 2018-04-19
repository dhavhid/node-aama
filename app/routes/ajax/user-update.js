/**
 * Created by david on 12/29/15.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var CategoryCodes    = require('../utils/category-codes')

module.exports = function userUpdateRouteFn( app ) {
    return function userUpdateRoute( req, res ) {
        user = req.session.user
        if (req.session.user == undefined) {
            res.status(401).json({message: 'You need to be logged in to see this content.'})
            return
        }
        app.sba.call({
            method: 'UpdateIndividualComplete',
            params: {
                intMemb_Id: req.body.user.intMemb_Id,
                intRep_Id: req.body.user.intRep_Id,
                strUsername: req.body.user.strUserName,
                Update: req.body.user.update
            }
        }).then((callResponse) => {
            
            options = FormatSbaDataset(
                callResponse,
                'data'
            )
            res.json({
                error: false,
                options:options
            })
        }).catch(HandleErrorsFn( req, res ))
    }
}