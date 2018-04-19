/**
 * Created by david on 3/7/16.
 */
var _ = require("lodash")

module.exports = function _parseSBAData(data)
{
    var results = []
    var pagination = {}
    _.forEach(data, function(item, index){
        var newItem = {}
        var hasProps = false;
        if (item.RecordsPaged != null) {
            _.forEach(item.RecordsPaged, function(record, j){
                _.forIn(record, function(value, key){
                    newItem[key] = value.trim()
                })
                hasProps = true
            })
        } else if (item.Facts != null) {
            _.forEach(item.Facts, function(record, j){
                _.forIn(record, function(value, key){
                    pagination[key] = value.trim()
                })
            })
        } else {
            _.forEach(item.Record, function(record, j){
                _.forIn(record, function(value, key){
                    if (Array.isArray(value)) {
                        var newDataSet = {}
                        _.forEach(value, function(dataset, index1){
                            _.forIn(dataset, function(value1,key1){
                                newDataSet[key1] = value1
                            })
                        })
                        newItem[key] = newDataSet
                    } else {
                        newItem[key] = value.trim()
                    }
                })
                hasProps = true
            })
        }
        if (hasProps) results.push(newItem)
    })
    return {data: results, pagination: pagination}
}