/**
 * Created by david on 3/1/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var CategoryCodes    = require('../utils/category-codes')
var AudienceSlugs    = require('../utils/audience-slugs')

function _parseFilterResults(data)
{
    var result = []
    _.forEach(data, function(item,i){
        var newItem = {}
        if (Array.isArray(item.Record)) {
            _.forEach(item.Record, function(record, j){
                _.forIn(record, function(value, key){
                    newItem[key] = value.trim()
                })
            })
        } else {
            _.forIn(item.Record, function(value, key){
                newItem[key] = value.trim()
            })
        }
        result.push(newItem)
    })
    return result
}

module.exports = function getProductsFilterCatalogsRouteFn (app)
{
    return function getProductsFilterCatalogsRoute( req, res ) {
        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience
        var globalResponse = {}

        var promises = [
            app.sba.call({method: 'GetCPDManufacturersWithPCILCount', params: {}}),
            app.sba.call({method: 'GetCPDOperatorType', params: {}}),
            app.sba.call({method: 'GetCPDPerformClasses', params: {}}),
            app.sba.call({method: 'GetCPDPerformGrade', params: {}}),
            app.sba.call({method: 'GetCPDFramingMat', params: {}})
        ]

        Promise.all(promises).then(function(Responses){
            _.forEach(Responses, function(response, index){
                response = FormatSbaDataset(response, 'data')
                if (response.GetCPDManufacturersWithPCILCountResult != null && response.GetCPDManufacturersWithPCILCountResult != undefined) {
                    globalResponse.manufacturers = _parseFilterResults(response.GetCPDManufacturersWithPCILCountResult[1].diffgram.MPDataSet)
                }
                if (response.GetCPDOperatorTypeResult != null && response.GetCPDOperatorTypeResult != undefined) {
                    globalResponse.prodtype = _parseFilterResults(response.GetCPDOperatorTypeResult[1].diffgram.MPDataSet)
                }
                if (response.GetCPDPerformClassesResult != null && response.GetCPDPerformClassesResult != undefined) {
                    globalResponse.perfclass = _parseFilterResults(response.GetCPDPerformClassesResult[1].diffgram.MPDataSet)
                }
                if (response.GetCPDPerformGradeResult != null && response.GetCPDPerformGradeResult != undefined) {
                    globalResponse.perfgrade = _parseFilterResults(response.GetCPDPerformGradeResult[1].diffgram.MPDataSet)
                }
                if (response.GetCPDFramingMatResult != null && response.GetCPDFramingMatResult != undefined) {
                    globalResponse.framemat = _parseFilterResults(response.GetCPDFramingMatResult[1].diffgram.MPDataSet)
                }
            })
            res.status(200).send(globalResponse)
        }).catch(HandleErrorsFn( req, res ))
    }
}