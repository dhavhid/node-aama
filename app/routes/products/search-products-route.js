/**
 * Created by david on 3/1/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var CategoryCodes    = require('../utils/category-codes')
var AudienceSlugs    = require('../utils/audience-slugs')

module.exports = function searchProductsRouteFn( app )
{
    return function searchProductsRoute( req, res ) {
        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

        var gradeInc = [10]
        _.times(22, function() {
            gradeInc.push(parseInt(_.last(gradeInc)) + 5)
        })
        gradeInc.push(130)
        gradeInc.push(150)
        res.render('search-products',{
            layout        : "static",
            title         : "Certified Product Directory",
            perfGrade     : gradeInc,
            audience      : audience,
            audienceSlug  : AudienceSlugs.toSlug(audience)
        })
    }
}