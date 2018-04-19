/**
 * Created by david on 2/23/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var FormatRecordsSba = require('../utils/format-records-sba')
var CategoryCodes    = require('../utils/category-codes')
var AudienceSlugs    = require('../utils/audience-slugs')

function _parseProduct(data)
{
    var result = {}
    _.forEach(data.Record, function(item, index){
        _.forIn(item, function(value, key){
            result[key] = value.trim()
        })
    })
    return result
}
module.exports = function getProductRouteFn( app )
{
    return function getProductRoute( req, res ) {
        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

        var testSpecifications = {
            'A' : 'AAMA/NWWDA 101/I.S.2-97',
            'B': 'ANSI/AAMA/WDMA 101/I.S.2/NAFS-02',
            'C': 'AAMA/WDMA/CSA 101/I.S.2/A440-05',
            'D': 'AAMA/WDMA/CSA 101/I.S.2/A440-08',
            'E': 'AAMA/WDMA/CSA 101/I.S.2/A440-11',
            'F': 'AAMA 1701.2-12',
            'G': 'AAMA 1702.2-12',
            'H': 'AAMA 450',
            'I': 'AAMA 506',
            'J': 'TAS 201/203',
            'K': 'TAS 202',
            'L': 'AAMA 1701.2-02',
            'M': 'AAMA 1702.2-02',
            'N': 'AAMA 1704',
            'O': '1002-11',
            'P': '1102-11'
        }
        app.sba.call({
            method: 'GetCPDDetail',
            params: {
                strMfctCode: '',
                intPcil_Id: req.params.id
            }
        }).then((callResponse) => {
            var options = FormatSbaDataset(callResponse, 'data')
            options = FormatRecordsSba([options.GetCPDDetailResult[1].diffgram.MPDataSet])
            options = options.data[0]
            // test specifications
            if (options.refteststd != null) {
                var testspec = options.refteststd.split('')
                var specs = []
                _.forEach(testspec, function(charac, n){
                    specs.push('<li>' + testSpecifications[charac] + '</li>')
                });
                options.refteststd = specs.join('')
            }
            // SI
            var unitwidth = (options.unitwidth)? parseInt(options.unitwidth) : 0
            var unitheight = (options.unitheight)? parseInt(options.unitheight) : 0
            options.framesizeSI = (unitwidth * unitheight)
            // PI
            var sashwidth = (options.sashwidth)? parseInt(options.sashwidth) : 0
            var sashheight = (options.sashheight)? parseInt(options.sashheight) : 0
            options.framesizePI = (sashwidth * sashheight)
            // determine if the set of data 450, 506 and miami should be displayed
            options.aama450 = true
            if (options.max450size == '' && (isNaN(options.max450pres) || options.max450pres == '0.00')) {
                options.aama450 = false
            }
            options.aama506 = true
            if (options.max506size.trim().length == 0 && options.level506.trim().length == 0 && options.windzon506 == '0' && options.rating506.trim().length == 0) {
                options.aama506 = false
            }
            options.aamaMiami = true
            if (isNaN(options.maxtas201s) && isNaN(options.tas201rat) && isNaN(options.maxtas202s) && options.tas202wp == '0.00' && isNaN(options.tas202rate)) {
                options.aamaMiami = false
            }
            res.render('product',{
                layout        : "static",
                title         : 'Certified Product Directory',
                audience      : audience,
                product       : options,
                audienceSlug  : AudienceSlugs.toSlug(audience)
            })
        }).catch(HandleErrorsFn( req, res ))
    }
}