/**
 * Created by david on 12/5/15.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var Cookie = require('cookie');

function _parseEventOption(user, option, cartId) {
	// parse the first option to add to cart.
	option.intRep_id = parseInt(user)
	option.intCart_Id = cartId
	option.intQuantity = parseInt(option.intQuantity)
	option.intOption_Id = parseInt(option.intOption_Id)
	return option
}

module.exports = function addEventOptionsToCartRouteFn( app ) {

	return function addEventOptionsToCartRoute( req, res ) {

		user = req.session.user.intRepID

		eventOptions = req.body.eventOptions
		if (req.session.cartId == undefined || req.session.cartId == 0) { // get a new cart id.
			res.send("There is no an active cart.")
		} else { // if there' a cart id then use that one.
			var glob_options = 0;
			_.forEach(eventOptions,function(Option,index){
				Option = _parseEventOption(user, Option, req.session.cartId)
				// sent just the first option so that we can get a new cart and send the rest of options.
				app.sba.call({
					method	: 'AddEventOptionToCart',
					params: Option
				}).then((callResponse) => {
					options = FormatSbaDataset(
						callResponse,
						'data.AddEventOptionToCartResponse.AddEventOptionToCartResult'
					)
					glob_options = options
				}).catch(HandleErrorsFn( req, res ));
			});
			res.json(glob_options)
		}
	}
}