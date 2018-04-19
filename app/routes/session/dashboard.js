var _                = require('lodash')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var FormatRecordsSba = require('../utils/format-records-sba')
var AudienceSlugs    = require('../utils/audience-slugs')
var HandleErrorsFn   = require('../utils/handle-errors') 
var moment           = require('moment')
var crypto           = require('crypto')
var publicKey        = "68e693a82ab964627eaa58f4ffe71c50ae415ea9987b4fde0d134e0ad9b58f13"
var privateKey       = "31417df6fe302bfebd1f440f2b24240c4c2b7fd817e9a35439d2d04f55bc9cba"
var stageAPI         = "https://aama-staging.knowbase.com"
var prodAPI          = "https://aama.knowbase.com"
var errorUrl         = "http://www.knowbase.com/"

function getTimeStamp() {
	var timestamp = new Date().toISOString()
	timestamp = timestamp.split("Z")
	timestamp = timestamp[0] + "0000Z"
	return timestamp
}

function getPlainText(user, timestamp) {
	return user.intRepID + user.strUserName + timestamp + publicKey
}


function getDigest(user) {
	var digest = ""
	var dmt = getTimeStamp()
	var plainText = getPlainText(user, dmt)
	var hmac = crypto.createHmac("sha256", new Buffer(privateKey, "utf8"))
	if (hmac) {
		digest = hmac.update(new Buffer(plainText, "utf8")).digest("base64")
	}

	var req = "aamaid=" + encodeURIComponent(user.intRepID) +
				"&username=" + encodeURIComponent(user.strUserName) + 
				"&date=" + encodeURIComponent(dmt) +
				"&publickey=" + encodeURIComponent(publicKey) + 
				"&digest=" + encodeURIComponent(digest) + 
				"&errorurl=" + encodeURIComponent(errorUrl)
	var ssourl = prodAPI + "/Custom/Service/sso.ashx?" + req
	return ssourl
}

function parseSurvey(data)
{
	var today = moment()
	var results = []
	_.forEach(data, function(item, index) {
		var startdate = (item.surveyopen.split("T"))[0]
		var enddate = (item.surveyends.split("T"))[0]
		startdate = moment(startdate, "YYYY-MM-DD")
		enddate = moment(enddate, "YYYY-MM-DD")
		if (item.status == 'OPEN' && today.isBetween(startdate,enddate)) {
			item.duedate = moment(enddate).format("MM/DD/YYYY")
			item.duedateunix = moment(enddate).unix()
			results.push(item)
		}
	})
	results = _.sortBy(results, 'duedateunix')
	return results
}

module.exports = function dashRouteFn( app ) {

	return function dashRoute( req, res ) {

		var audience = req.session.audience
		audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

		var globalResults = {available: [], required: [], productcomment: [], productreq: []}
		var user = req.session.user
		//console.log(user)
		var ssourl = getDigest(user)
		var promises = [
			app.sba.call({method: 'GetSurveyIIAvlBallots', params: {intRepId: user.intRepID}}),
		    app.sba.call({method: 'GetSurveyIIReqBallots', params: {intRepId: user.intRepID}}),
			app.sba.call({method: 'GetProductGroupCommentBallots', params: {}}),
			app.sba.call({method: 'GetProductGroupReqBallots', params: {intId: user.intMembID, intRepId: user.intRepID, strCustom18: ''}})
		]

		Promise.all(promises).then(function(Responses){
			_.forEach(Responses, function(response, index){
				var options = FormatSbaDataset(response, 'data')
				if (options.GetSurveyIIAvlBallotsResult != undefined || options.GetSurveyIIAvlBallotsResult != null) {
					if (Array.isArray(options.GetSurveyIIAvlBallotsResult[1].diffgram)) {
						options = FormatRecordsSba(options.GetSurveyIIAvlBallotsResult[1].diffgram[0].MPDataSet)
					} else options = {data: []}
					if (options.data.length > 0) {
						globalResults.available = parseSurvey(options.data)
					}
				}
				if (options.GetSurveyIIReqBallotsResult != undefined || options.GetSurveyIIReqBallotsResult != null) {
					if (Array.isArray(options.GetSurveyIIReqBallotsResult[1].diffgram)) {
						options = FormatRecordsSba(options.GetSurveyIIReqBallotsResult[1].diffgram[0].MPDataSet)
					} else options = {data: []}
					if (options.data.length > 0) {
						globalResults.required = parseSurvey(options.data)
					}
				}
				if (options.GetProductGroupCommentBallotsResult != undefined || options.GetProductGroupCommentBallotsResult != null) {
					if (Array.isArray(options.GetProductGroupCommentBallotsResult[1].diffgram)) {
						options = FormatRecordsSba(options.GetProductGroupCommentBallotsResult[1].diffgram[0].MPDataSet)
					} else options = {data: []}
					if (options.data.length > 0) {
						globalResults.productcomment = parseSurvey(options.data)
					}
				}
				if (options.GetProductGroupReqBallotsResult != undefined || options.GetProductGroupReqBallotsResult != null) {
					if (Array.isArray(options.GetProductGroupReqBallotsResult[1].diffgram)) {
						options = FormatRecordsSba(options.GetProductGroupReqBallotsResult[1].diffgram[0].MPDataSet)
					} else options = {data: []}
					if (options.data.length > 0) {
						globalResults.productreq = parseSurvey(options.data)
					}
				}
			})

			var allowEditBusiness = false
			if (user.strRepStatus == 'M') {
				allowEditBusiness = true
			}

			res.render('dashboard', {
				layout               : 'static',
				title                : "Dashboard",
				user                 : req.session.user,
				allowEditBusiness    : allowEditBusiness,
				availableBallots     : globalResults.available,
				totalAvailable       : globalResults.available.length,
				requiredBallots      : globalResults.required,
				totalRequired        : globalResults.required.length,
				productComment       : globalResults.productcomment,
				totalProductComment  : globalResults.productcomment.length,
				productRequired      : globalResults.productreq,
				totalProductRequired : globalResults.productreq.length,
				ssourl               : ssourl,
				audience             : audience,
				audienceSlug         : AudienceSlugs.toSlug(audience),
			})
		}).catch(HandleErrorsFn(req, res))
	}
}