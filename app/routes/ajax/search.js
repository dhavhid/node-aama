/**
 * Created by david on 2/4/15.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')

var search_items = ['messaging','news','static_pages','events','faqs','online_store','certified_product_directory','digital_media','users','call_to_action','member_directory'];

module.exports = function ajaxSearchRouteFn( app ) {

	return function ajaxSearchRoute( req, res ) {

		var globalResponse = {static_page: {}, news: {}, faqs: {}, messaging: {}, digital_media: {}, call_to_action: {}, people: {}}
		var searchObj = req.body.searchObj
		var term = searchObj.term.toLowerCase().trim()

		var promises = [
			app.cms('get', '/public/contents/static_page/list', {}),
			app.cms('get', '/public/contents/news/list', {}),
			app.cms('get', '/public/contents/faq/list', {}),
			app.cms('get', '/public/contents/messaging/list', {}),
			app.cms('get', '/public/contents/digital_media/list', {}),
			app.cms('get', '/public/contents/call_to_action/list', {}),
			app.cms('get', '/public/contents/user/list', {})
		]

		Promise.all(promises).then(function(responses){
			_.forEach(responses, function(response, index){
				response = response.data
				// check if we got results to categorize them
				if (response.length > 0) {
					if (response[0]['type'] != null) {
						// filter results.
						globalResponse[response[0]['type']] = _.filter(response, function(o){
							if (o.title == null) o.title = ''
							if (o.byline == null) o.byline = ''
							if (o.content == null) o.content = ''
							if (o.title.toLowerCase().indexOf(term) != -1 || o.byline.toLowerCase().indexOf(term) != -1 || o.content.toLowerCase().indexOf(term) != -1) {
								return o
							}
							else {
								termTrimmed = term.replace(/\s+/g, '')
								if (o.title.toLowerCase().indexOf(termTrimmed) != -1 || o.byline.toLowerCase().indexOf(termTrimmed) != -1 || o.content.toLowerCase().indexOf(termTrimmed) != -1) {
									return o
								}
							}
						})
						if (globalResponse[response[0]['type']].length == 0) {
							globalResponse[response[0]['type']] = {}
						}
					} else if(response[0]['userId'] != null) {
						globalResponse['people'] = _.filter(response, function(o){
							if (o.firstName == null) o.firstName = ''
							if (o.lastName == null) o.lastName = ''
							if (o.firstName.toLowerCase().indexOf(term) != -1 || o.lastName.toLowerCase().indexOf(term) != -1) {
								return o
							}
						})
						if (globalResponse['people'].length == 0) {
							globalResponse['people'] = {}
						}
					}
				}
			})
			res.send(globalResponse)
		}).catch(HandleErrorsFn( req, res ));
	}
}