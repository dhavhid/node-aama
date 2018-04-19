/**
 * Created by david on 12/15/15.
 */
var HandleErrorsFn = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')

module.exports = function placeOrderRouteFn( app ) {

	return function placeOrderRoute( req, res ) {

		if (req.session.user == undefined) {
			res.status(401).json({message: 'You need to be logged in to see this content.'})
			return
		}
		if (req.session.cartId == undefined) {
			res.status(404).json({message: 'Your cart is empty.'})
			return
		}
		user = req.session.user.intRepID
		app.sba.call({
				method	: 'CreditCardPayCart',
				params: {
					intCart_Id: parseInt(req.session.cartId),
					intRep_Id: user,
					strCreditCard: req.body.credit_card,
					strExpirationDate: req.body.exp_date,
					strCVV2: req.body.cvc
				}
			})
			.then((callResponse) => {

			var options = FormatSbaDataset(
				callResponse,
				'data.CreditCardPayCartResponse'
			)

			res.send( options )

	}).catch(HandleErrorsFn( req, res ));

	}
}