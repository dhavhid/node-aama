/**
 * Created by david on 2/12/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var CategoryCodes    = require('../utils/category-codes')
var AudienceSlugs    = require('../utils/audience-slugs')

module.exports = function businessesRouteFn( app )
{
    return function businessesRoute( req, res) {
        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

        res.render('businesses', {
            layout       : "static",
            title        : 'Member Directory',
            audience     : audience,
            audienceSlug : AudienceSlugs.toSlug(audience),
        })
    }
}