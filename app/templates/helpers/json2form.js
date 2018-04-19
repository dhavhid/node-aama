/**
 * Created by david on 3/8/16.
 */
var _ = require('lodash')
module.exports = function(jsonfields)
{
    var fields = ''
    _.forIn(jsonfields, function(value, key){
        fields = fields + '<input type="hidden" value="' + value + '" name="' + key + '">'
    })
    return fields;
}