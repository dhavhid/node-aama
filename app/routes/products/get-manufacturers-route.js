/**
 * Created by david on 2/23/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var CategoryCodes    = require('../utils/category-codes')
var AudienceSlugs    = require('../utils/audience-slugs')

function _parseManufacturers(data)
{
    var result = []
    _.forEach(data, function(item, index){
        result.push({
            id    : parseInt(item.Record[1].id),
            count : parseInt(item.Record[0].pcil_count),
            name  : item.Record[2].disp_name.trim()
        })
    })
    return result
}

module.exports = function getManufacturersRouteFn( app )
{
    return function getManufacturersRoute ( req, res ) {
        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

        // get the whole list of manufacturers.
        app.sba.call({
            method: 'GetCPDManufacturersWithPCILCount',
            params: {}
        }).then((callResponse) => {

            var options = FormatSbaDataset(callResponse, 'data')

            options = _parseManufacturers(options.GetCPDManufacturersWithPCILCountResult[1].diffgram.MPDataSet)
            res.render('products-listing', {
                layout        : "static",
                title         : 'Certified Product Directory',
                audience      : audience,
                manufacturers : options,
                audienceSlug  : AudienceSlugs.toSlug(audience)
            })

        }).catch(HandleErrorsFn( req, res ))
    }
}