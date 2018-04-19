/**
 * Created by david on 12/15/15.
 */
var HandleErrorsFn = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')

module.exports = function deleteCartRouteFn( app ) {

	return function deleteCartRoute( req, res ) {

		if (req.session.user == undefined) {
			res.status(401).json({message: 'You need to be logged in to see this content.'})
			return
		}
		if (req.session.cartId == undefined) {
			res.status(404).json({message: 'Your cart is empty.'})
			return
		}

		app.sba.call({
				method	: 'DeleteCart',
				params: {
					intCart_Id: parseInt(req.session.cartId)
				}
			})
			.then((callResponse) => {

			var options = FormatSbaDataset(
				callResponse,
				'data'
			)

			res.send( options )

	}).catch(HandleErrorsFn( req, res ));

	}
}