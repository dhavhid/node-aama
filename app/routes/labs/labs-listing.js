/**
 * Created by david on 4/25/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var AudienceSlugs    = require('../utils/audience-slugs')

module.exports = function labsListingRouteFn( app )
{
    return function labsListingRoute( req, res ) {

        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

        app.sba.call({
            method: 'MPQuery',
            params: {
                strSQLSelect: "Select addr.state from PCLO Join Addr on pclo.addr_id=addr.addr_id where upper(allt(pclo.loc_code))#'X' Group by state"
            }
        }).then((Response) => {
            var options = FormatSbaDataset(Response, 'data')
            options = _.map(options.MPQueryResult[1].diffgram.MPDataSet, function(o){ if (o.Record.state.trim().length > 0) return o.Record.state})

            res.render('accredited-labs', {
                layout            : "static",
                title             : 'Accredited Labs',
                states            : options,
                audience          : audience,
                audienceSlug      : AudienceSlugs.toSlug(audience),
            })
        }).catch(HandleErrorsFn(req, res))
    }
}