var HandleErrorsFn = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')

module.exports = function getEventOptionsRouteFn( app ) {
	
	return function getEventOptionsRoute( req, res ) {
		
		if (req.session.user == undefined) {
			res.status(401).json({message: 'You need to be logged in to see the event options.'})
			return
		}
		
		app.sba.call({
			method	: 'GetEventOptionsSpec',
			params: {
				// intRep_Id: req.params.repId,
				intRep_Id: req.session.user.intRepID,
				intCale_ID: req.params.eventId,
				showsoldout: "false"
			}
		})
		.then((callResponse) => {

			var options = FormatSbaDataset(
				callResponse,
				'data.GetEventOptionsSpecResponse.GetEventOptionsSpecResult'
			)

			res.json( options )
			
		})
		.catch(HandleErrorsFn( req, res ));

	}
}
