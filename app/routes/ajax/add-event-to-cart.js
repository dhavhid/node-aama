var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var FormatRecordsSba = require('../utils/format-records-sba')
var Cookie           = require('cookie')

module.exports = function addEventToCartRouteFn( app ) {
	return function addEventToCartRoute( req, res ) {

		var loggedIn = true
        if (req.session.user == undefined) {
            loggedIn = false
        }
		var user = req.session.user; //.intRepID
		var cartId = 0

		if (req.session.cartId == undefined || req.session.cartId == 0) { // get a new cart id.
			cartId = 0
		} else {
			cartId = req.session.cartId
		}

		// sent just the first option so that we can get a new cart and send the rest of options.
		app.sba.call({
				method	: 'AddEventOptionToCart',
				params: {
					intOption_Id: parseInt(req.body.eventId),
					strType: 'MFUN',
					intRep_id: parseInt(user.intRepID),
					intCart_Id: parseInt(cartId),
					intQuantity: 1
				}
		}).then((callResponse) => {
			var options = FormatSbaDataset(callResponse,'data')

			req.session.cartId = parseInt(options.AddEventOptionToCartResult)
			res.json( options.AddEventOptionToCartResult )

		}).catch(HandleErrorsFn( req, res ));

	}
}