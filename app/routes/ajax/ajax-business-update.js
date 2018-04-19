/**
 * Created by david on 3/31/16.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var FormatRecordsSba = require('../utils/format-records-sba')
var AudienceSlugs = require('../utils/audience-slugs')

module.exports = function ajaxBusinessUpdateFn( app ) {

    return function ajaxBusinessUpdateRoute( req, res ) {
        var audience = req.session.audience
        audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

        if (req.session.user == undefined) {
            res.status(401).json({message: 'You need to be logged in to see this content.'})
            return
        }
        var user = req.session.user
        var data = {
            intMemb_Id: parseInt(req.body.data._Memb_Id),
            strUsername: user.strUserName,
            Update: req.body.data,
            Updmembver: true
        }
        /*var update = req.body.data
        // send addresses and phone updates.
        var promises = [
            app.sba.call({method: 'AddAddressToBusinessWithUserName', params: {
                intMemb_Id: parseInt(update._Memb_Id),
                strAddressType: 'mailing',
                strAddress1: update.MailingAddress.Address1,
                strAddress2: update.MailingAddress.Address2,
                strCity: update.MailingAddress.City,
                strState: update.MailingAddress.State,
                strZip: update.MailingAddress.Zip,
                strCountry: update.MailingAddress.Country,
                strUserName: user.strUserName
            }}),
            app.sba.call({method: 'AddPhoneToBusinessWithUserName', params: {
                intMemb_Id: parseInt(update._Memb_Id),
                strPhoneType: 'phone1',
                strPhone: update.Phone1.Phone,
                blnInternational: update.Phone1.International,
                strCountryCode: update.Phone1.Country_Code,
                strUserName: user.strUserName,
                strPhoneExt: ''
            }})
        ]
        // add physical address if needed
        if (update.PhysicalAddress.Zip.trim().length > 0) {
            promises.push(app.sba.call({method: 'AddAddressToBusinessWithUserName', params: {
                intMemb_Id: parseInt(update._Memb_Id),
                strAddressType: 'physical',
                strAddress1: update.PhysicalAddress.Address1,
                strAddress2: update.PhysicalAddress.Address2,
                strCity: update.PhysicalAddress.City,
                strState: update.PhysicalAddress.State,
                strZip: update.PhysicalAddress.Zip,
                strCountry: update.PhysicalAddress.Country,
                strUserName: user.strUserName
            }}))
        }
        // add second phone if needed.
        if (update.Phone2.Phone.trim().length > 0) {
            promises.push(app.sba.call({method: 'AddPhoneToBusinessWithUserName', params: {
                intMemb_Id: parseInt(update._Memb_Id),
                strPhoneType: 'phone2',
                strPhone: update.Phone2.Phone,
                blnInternational: update.Phone2.International,
                strCountryCode: update.Phone2.Country_Code,
                strUserName: user.strUserName,
                strPhoneExt: ''
            }}))
        }*/

        Promise.all(promises).then(function(Responses){
            _.forEach(Responses, function(response){
                var options = FormatSbaDataset(response, 'data')
                console.log(options)
            })
        }).catch(HandleErrorsFn(req,res))
        app.sba.call({method:'UpdateBusinessComplete', params: data}).then(function(callResponse) {
            var options = FormatSbaDataset(callResponse, 'data')
            res.send(options)
        }).catch(HandleErrorsFn(req, res))
    }
}