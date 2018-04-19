/**
 * Created by david on 3/2/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var CategoryCodes    = require('../utils/category-codes')
var AudienceSlugs    = require('../utils/audience-slugs')

function _parseManufacturers(data)
{
    var results = []
    var facts = {}
    _.forEach(data, function(item, index){
        if (item.RecordsPaged != undefined) {
            var newItem = {}
            _.forEach(item.RecordsPaged, function(rp, index){
                _.forIn(rp, function(value, key){
                    newItem[key] = value.trim()
                })
            })
            results.push(newItem)
        }
        if (item.Facts != undefined) {
            facts = {
                NumRecordsFound: parseInt(item.Facts[0].NumRecordsFound),
                ItemsPerPage: parseInt(item.Facts[1].ItemsPerPage),
                PageNum: parseInt(item.Facts[2].PageNum),
                TotalPages: parseInt(item.Facts[3].TotalPages)
            }
        }
    })
    return {results: results, facts: facts}
}

module.exports = function ajaxSearchProductsFn( app )
{
    return function ajaxSearchProductsRoute( req, res ) {
        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

        app.sba.call({
            method: 'GetCPDSearch',
            params: {
                strManuFact: req.body.strManuFact,
                strFrameMat: req.body.strFrameMat,
                strPerfGrade: req.body.strPerfGrade,
                strPerfClass: req.body.strPerfClass,
                strProdType: req.body.strProdType,
                strPerfGradeEquator: req.body.strPerfGradeEquator,
                strTas: req.body.strTas,
                str506: req.body.str506,
                intPageNum: parseInt(req.body.intPageNum),
                intItemsPerPage: 25
            }
        }).then((callResponse) => {
            var options = FormatSbaDataset(callResponse, 'data')
            options = _parseManufacturers(options.GetCPDSearchResult[1].diffgram.NewDataSet)
            res.send(options)
    }).catch(HandleErrorsFn( req, res ))
    }
}