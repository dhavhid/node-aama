var AudienceSlugs = require('../utils/audience-slugs')
var HandleErrorsFn = require('../utils/handle-errors')
var FormatSbaDataset = require('../utils/format-sba-dataset')
var _ = require('lodash')

/* Example user: { strUserName: 'ZGCQBSSS',
  strPassword: 'sfbhmzgA',
  blnLoggedIn: 'true',
  strLoginMessage: 'Login Successful!',
  intMembID: '24640',
  intRepID: '39740',
  strMembStatus: 'C',
  strRepStatus: 'M',
  BusinessType: 'M',
  blnWebSupervisor: 'true',
  strCompanyName: 'Cubic Creative',
  strFirstName: 'Michelle',
  strLastName: 'Singer',
  strTitle: 'Account Director',
  strAddressLine1: '1643 S. Boston Ave.',
  strAddressLine2: '',
  strCity: 'Tulsa',
  strState: 'OK',
  strZip: '74119',
  strEmail: 'michelle@cubiccreative.com',
  strPhone: '9185877888',
  strPhoneExt: '',
  strFax: '9183989081',
  strPreferredName: '',
  dtWebMemberVer: '1899-12-30T00:00:00',
  dtLastLogin: '2015-12-02T08:42:14',
  blnAllowEconAccess: 'true',
  blnAllowMembersOnlyAccess: 'true',
  blnAllowInvoiceCheckOut: 'false',
  allow_campaign: 'false',
  intCPVO_ID: '0',
  intCPTM_ID: '0',
  intVice_Admin: '0',
  blnTeamCaptain: 'false' } */

module.exports = function loginRouteFn( app ) {
	
	return function loginRoute( req, res ) {

		var audience = req.session.audience
		audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

		app.sba.call({
			method: 'AuthenticateUser',
			params: {
				strUserName: String(req.body.username),
				strPassword: String(req.body.password)
			}
		})
		.then((callResponse) => {

			var user = FormatSbaDataset(
				callResponse,
				'data.AuthenticateUserResponse.AuthenticateUserResult.AuthenticatedUserData',
				true
			)

			var isLoggedIn = user && user.blnLoggedIn === "true"

			if( isLoggedIn ) {
				
				req.session.user = user
				delete user.strPassword
				req.session.isLoggedIn = true
				
				req.cookies.set( "user", JSON.stringify(user), {
					httpOnly: false,
					signed: false
				})
				
				req.session.save(function( err ) {
					
					// Bail if there is an error
					if( err ) {
						return res.status(500).render('error', {
							layout: 'static',
							title: '500',
							message: 'There was an error inside the server and your session information could not be saved.',
						})
					}
					
					// Redirect on success
					res.redirect( req.query.redirect ? req.query.redirect : '/session/dashboard' )
				})
				
			} else {
				delete req.session.user
				req.cookies.set( "user" )
				var message = _.get(user, "strLoginMessage", "There was a problem logging in.")
				
				res.status(401).render('error', {
					layout: 'static',
					title: 'Could not log in',
					message: message,
					audience: audience,
				})
			}
		})
		.catch(HandleErrorsFn( req, res ));
	}
}