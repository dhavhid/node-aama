/**
 * Created by david on 2/17/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var FormatRecordsSba = require('../utils/format-records-sba')

module.exports = function getBusinessesRouteFn( app )
{
    return function getBusinessesRoute( req, res ) {
        var loggedIn = false
        if (req.session.user != undefined) {
            loggedIn = true
        }
        // if user is logged in we will show contact data otherwise we will show only name and description.
        var basedon = req.body.basedon || 'Keyword'
        app.sba.call({
            method: 'BusinessSearch',
            params: {
                strAllAnyExact        : 'Any',
                strSearchType         : basedon,
                intPageNum            : req.body.page,
                intItemsPerPage       : 15,
                strKeywords           : req.body.strKeywords || 'ALL', // as we don' have any other method to fetch a full list of businesses we will use search with a common keyword.
                strKWWhere            : '',
                strBusinessStatus     : '',
                OverRideSortByWebSort : 'false'
            }
        }).then((callResponse) => {
            var options = FormatSbaDataset(callResponse, 'data')
            var businesses = []
            if (options.BusinessSearchResult[1].diffgram != '') {
                businesses = FormatRecordsSba(options.BusinessSearchResult[1].diffgram.NewDataSet)
                businesses.loggedIn = loggedIn
            }
            res.send(businesses)
        }).catch(HandleErrorsFn( req, res ))
    }
}