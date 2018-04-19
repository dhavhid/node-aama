/**
 * Created by david on 3/29/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var FormatRecordsSba = require('../utils/format-records-sba')
var AudienceSlugs = require('../utils/audience-slugs')

module.exports = function ajaxBusinessGetFn( app ) {

    return function ajaxBusinessGetRoute( req, res ) {
        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

        if (req.session.user == undefined) {
            res.status(401).json({message: 'You need to be logged in to see this content.'})
            return
        }
        var user = req.session.user

        app.sba.call({method:'GetBusinessInfo', params: {int_Id: user.intMembID}}).then((callResponse) => {
            var options = FormatSbaDataset(callResponse, 'data')
            options = FormatRecordsSba([{Record: options.GetBusinessInfoResult}])
            res.send(options.data[0])
    }).catch(HandleErrorsFn(req, res))
    }
}