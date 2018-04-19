var Request = require('superagent')
var _ = require('lodash')

function _sendSessionRequest() {
	
	return new Promise( function( resolve, reject ) {
		
		Request
		.post( process.env.CMS_URL + '/users/session' )
		.send({
			"email": process.env.CMS_EMAIL,
			"password": process.env.CMS_PASSWORD
		})
		.end(function(err, res){
			if( err ) {
				return reject( err )
			}
			if( res.body.status === 'error' ) {
				return reject( res.body.message )
			}
			
			resolve( res.header['set-cookie'][0] )
		})
	})
}

function _getSessionFn() {
	
	var session = _sendSessionRequest()
	
	return function getSession( getFreshSession ) {
		
		if( getFreshSession ) {	session = _sendSessionRequest() }
		return session
	}
}

function _sendRequest( session, type, url, parameters ) {
	
	return new Promise( function( resolve, reject ) {

		Request[ type ]( process.env.CMS_URL + url )
		.set('Cookie', session)
		.query(parameters)
		.end(function(err, res){
			if( err ) {
				return reject( err )
			}

			var isError = _.get(res, 'body.status') === "error"

			if( isError ) {
				reject( _.get(res, 'body.message') )
			}
			resolve( res.body )
		})
	})
}

function _sendRequestWithSessionAccess( getSession, type, url, parameters ) {
	
	return getSession().then(session => {
		
		return _sendRequest( session, type, url, parameters )
		
	})
	.catch( err => {
		
		if( err === "Not authorized for this operation" ) {

			// Try to fetch the session a second time in case the cached
			// one was invalidated for whatever reason
			return getSession( true ).then( session => {
				return _sendRequest( session, type, url, parameters )
			})

		} else {

			return Promise.reject( err )

		}
	})
}

module.exports = function cmsFn() {
	
	var getSession = _getSessionFn()
	
	return function cms( type, url, parameters ) {
		return _sendRequestWithSessionAccess( getSession, type, url, parameters )
		
	}
}