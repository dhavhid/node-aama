/**
 * Created by david on 4/25/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var FormatRecordsSba = require('../utils/format-records-sba')
var AudienceSlugs    = require('../utils/audience-slugs')

module.exports = function getLabsListingRouteFn( app )
{
    return function getLabsListingRoute( req, res ) {

        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

        //get and parse optional parameters.
        var state = req.body.state
        if (state.trim().length > 0) {
            state = " AND addr.state LIKE '%" + state + "%'"
        } else state = ""

        var keyword = req.body.keyword
        if (keyword.trim().length > 0) {
            keyword = " AND (upper(Name) LIKE '" + keyword.toUpperCase() + "%' OR upper(repr.fname) LIKE '" + keyword.toUpperCase() + "%' OR upper(repr.lname) LIKE '" + keyword.toUpperCase() + "%')"
        } else keyword = ""

        var query = "Select pclo.pclo_id, pclo.id as id, pclo.loc_code, IIF(Empty(pclo.loc_name),memb.name,pclo.loc_name) as Name, Addr.address1, addr.address2, addr.city, addr.state, addr.zip, urla.url as website, repr.fname, repr.mi, repr.lname, Phon.phone, emai.email from PCLO Join Addr on pclo.addr_id=addr.addr_id Join MEMB on pclo.id=memb.id Join PCRP on pcrp.pclo_id=pclo.pclo_id Join REPR on pcrp. rep_id=repr.rep_id and repr_stat='T' Join Phon on phon.phon_id=repr.phone1_id Join Emai on Emai.emai_id=repr.email_id Join URLA on urla.urla_id=memb.url_id where upper(allt(pclo.loc_code))#'X'" + state + keyword

        app.sba.call({
            method: 'MPQuery',
            params: {
                strSQLSelect: query
            }
        }).then((Response) => {
            var options = FormatSbaDataset(Response, 'data')
            if (!Array.isArray(options.MPQueryResult[1].diffgram.MPDataSet)) {
                options.MPQueryResult[1].diffgram.MPDataSet = [options.MPQueryResult[1].diffgram.MPDataSet]
            }
            options = FormatRecordsSba(options.MPQueryResult[1].diffgram.MPDataSet)

            res.send(options.data)
        }).catch(HandleErrorsFn(req, res))
    }
}