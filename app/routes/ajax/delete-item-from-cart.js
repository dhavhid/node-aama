/**
 * Created by david on 12/15/15.
 */
var HandleErrorsFn = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')

module.exports = function deleteItemFromCartRouteFn( app ) {

	return function deleteItemFromCartRoute( req, res ) {

		if (req.session.user == undefined) {
			res.status(401).json({message: 'You need to be logged in to see this content.'})
			return
		}
		console.log(req.session.cartId)
		app.sba.call({
				method	: 'DeleteItemFromCart',
				params: {
					intTrsc_Id: parseInt(req.body.TransId)
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