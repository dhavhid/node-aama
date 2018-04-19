/**
 * Created by david on 1/07/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')

function _parseMembers(dataset)
{
    var committees = [];
    _.forEach(dataset, function(item, index){
        var i = _.findIndex(committees,function(chr){
            return chr.code == item.Record[0].comcode.trim();
        });
        if ( i == -1) {
            i = committees.length;
            committees[i] = {
                code: item.Record[0].comcode.trim(),
                members: []
            }
        }
        committees[i].members.push(item.Record);
    })
    return committees;
}

module.exports = function getCommitteMembersRouteFn( app ) {

    return function getCommitteeMembersRoute( req, res) {
        if (req.session.user == undefined) {
            res.status(401).json({message: 'You need to be logged in to see this content.'})
            return
        }

        app.sba.call({
            method: 'GetCommitteeMembers',
            params: {
                strCommitteeCode: '',
                intPageNum: 0,
                intItemsPerPage: 0,
                intBusId: 0
            }
        }).then((callResponse) => {

            var options = FormatSbaDataset(
                callResponse,
                'data.GetCommitteeMembersResponse.GetCommitteeMembersResult'
            )
            var committees = _parseMembers(options[1].MPDataSet)
            res.json({
                committees: committees
            })
    }).catch(HandleErrorsFn( req, res ));
    }
}