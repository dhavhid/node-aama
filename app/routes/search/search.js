/**
 * Created by david on 2/4/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var CategoryCodes    = require('../utils/category-codes')
var AudienceSlugs    = require('../utils/audience-slugs')

module.exports = function searchRouteFn(app) {

    return function searchRoute( req, res ) {
        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

        var _search = '';
        if (req.query._search != undefined) {
            _search = req.query._search
        }
        res.render('search', {
            layout : "static",
            title  : 'Search',
            search : _search,
            audience: audience,
            audienceSlug: AudienceSlugs.toSlug(audience),
        })
    }
}