/**
 * Created by david on 12/15/15.
 */
var _                = require('lodash')
var HandleErrorsFn   = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var CategoryCodes    = require('../utils/category-codes')

function _parseItems(Cart)
{
	var events = [];
	var subtotal = 0.0;
	var shipping = 0;
	_.forEach(Cart, function(Items, index){
		var Item = (Items.CartItems) ? Items.CartItems : Items;
		// building the new option.
		var newOption = {
			optionId: Item[5].EventOption_Id,
			description: Item[1].Description,
			quantity: Item[0].Quantity,
			cost: Item[15].Unit_Cost,
			shipping: Item[18].Shipping,
			transactionId: Item[2].Trsc_id,
			eventId: Item[6].Event_Id,
			eventName: Item[7].Event_Name
		}
		// find out if the current event exits in the resulting array to group by event.
		var i = _.findIndex(events,function(chr){
			return chr.eventId == Item[6].Event_Id;
		});
		if (i == -1) { // the event does not exist in the resulting array
			i = events.length; // will default to the last index in the array.
			events[i] = {eventId: newOption.eventId, eventName: newOption.eventName, items: []};
		}
		// add the new option to the resulting array
		events[i].items.splice(-1,0,newOption)
		// calculating subtotal and shipping
		subtotal = subtotal + parseFloat(Item[15].Unit_Cost);
		shipping = shipping + parseFloat(Item[18].Shipping);
	}); // end of each of the items in the cart.
	return {events: events, subtotal: subtotal, shipping: shipping, total: (subtotal + shipping)};
}

module.exports = function checkoutRouteFn( app ) {


	return function checkoutRoute( req, res ) {

		user = req.session.user.intRepID
		var options = {}
		if (req.session.cartId != undefined && !isNaN(req.session.cartId)) {
			app.sba.call({
				method: 'GetCart',
				params: {
					intCart_Id: req.session.cartId,
					intRep_ID: user
				}
			}).then((callResponse) => {
				options = FormatSbaDataset(
				callResponse,
				'data.GetCartResponse.GetCartResult[1]'
			)
			options = _parseItems(options.Cart)
			res.render('checkout', {
				layout  : "static",
				title : 'Checkout',
				options : options.events,
				subtotal: options.subtotal.toFixed(2),
				shipping: options.shipping.toFixed(2),
				total   : options.total.toFixed(2)
			})

		}).catch(HandleErrorsFn( req, res ));
		} else if (req.session.cartId == undefined && req.session.user != undefined) { // empty cart.
			res.render('cart', {
				layout  : "static",
				title : 'Checkout',
				message : 'Your cart is empty. Please visit our <a href="/events">events page</a> to see more options.',
				error: true
			})
		} else { // not logged in.
			res.render('cart', {
				layout  : "static",
				title : 'Checkout',
				message : 'You need to be logged in to see this content.',
				error: true
			})
		}
	}
}