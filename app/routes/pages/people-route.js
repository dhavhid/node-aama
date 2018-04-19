var _ = require('lodash')
var AudienceSlugs = require('../utils/audience-slugs')
var HandleErrorsFn = require('../utils/handle-errors')
var HandleCMSErrorsFn = require('../utils/handle-cms-errors')


function groupByCategory( people, categories) {
	/* 
	var groups = {
		"Executives" : []
	}
	*/
	var groups = {}

	// Do not display Administrator user
	_.remove( people, function(person) {
		return person.title == "Administrator"
	})

	// Organize people into groups by department
	_.each( people, function(person) { 
		_.each( person.categories, function(category) {
			if(!category.isVisible) return

			if(_.isArray(groups[category.name])) {
				groups[category.name].push(person)
			}  
			else {
				groups[category.name] = [person]
			}
		})
	})

	// Split each group into chunks of three for easy bootstrap columns
	_.each( groups, function(group, key) {
		groups[key] = _.chunk(group, 3)
	})

	// Save each group department key and description in property
	_.each( groups, function(group, key) {
		group.key = key
		group.description = _.find( categories, { name : key }).description
	})

	// Sort groups by category order
	groups = _.sortBy( groups, function(group, key) {
		return _.find( categories, { name : key }).order
	})
	
	return groups
}

module.exports = function peopleRouteFn( app ) {

	return function peopleRoute( req, res ) {

		var audience = req.session.audience
		audience = req.session.audience = AudienceSlugs.toName(req.params.audience) || req.session.audience

		Promise.all([app.cms( "get", "/public/contents/user/list/", {} ), app.cms( "get", "/category/user/list/", {} )])

		.then(
			function( lists ) {
				var people = lists[0].data
				var categories = lists[1].data

				res.render('people', {
					layout: 'static',
					groups: groupByCategory(people, categories),
					title: "Our Staff",
					cats: categories,
					audience: audience,
					audienceSlug: AudienceSlugs.toSlug(audience),
				})
			},
			HandleCMSErrorsFn( res ) 
		)
		
		.catch( HandleErrorsFn( req, res ) )
	}
}

/*
Example user
{ "data": [
	{ "id":1,
	  "email": "admin@admin.com",
	  "firstName": "Admin",
	  "lastName": "Main",
	  "bio": "",
	  "slug": "-",
	  "title": "Administrator",
	  "officePhone": null,
	  "mobilePhone": null,
	  "fax": null,
	  "seoTitle": null,
	  "seoDescription": null,
	  "expiryDate": null,
	  "publishDate": "2015-10-05T21:40:00.000Z",
	  "order": 1,
	  "displayProfile": true,
	  "adminAccess": true,
	  "isFeatured": true,
	  "isPrivate": true,
	  "isVisible": true,
	  "images":
  		{ "logo":
  			{ "name": "logo-grey.png",
  			  "shortname": "logo-grey",
  			  "ext": "png",
  			  "mime": "image/png",
  			  "type": "image",
  			  "source": "http://aama-media.s3.amazonaws.com/4473ff40-7bc3-11e5-ba16-5b6e90ed3d03.png",
  			  "title": "logo-grey",
  			  "documentType": "png",
  			  "data":
  				{ "mimetype": "image/png",
  				  "thumb": "http://aama-media.s3.amazonaws.com/4473ff40-7bc3-11e5-ba16-5b6e90ed3d03.thumb.png",
  				  "scaled": "http://aama-media.s3.amazonaws.com/4473ff40-7bc3-11e5-ba16-5b6e90ed3d03.png",
  				  "preview": "http://aama-media.s3.amazonaws.com/4473ff40-7bc3-11e5-ba16-5b6e90ed3d03.preview.png"
  				},
  			  "altTag": "aama logo"
  			}
  		},
	  "data":{ "wysiwygBio": "" },
	  "userId": 1,
	  "files": [
		{ "id": 1,
		  "title": "1.txt",
		  "altTag": null,
		  "source": "http://aama-media.s3.amazonaws.com/462ff130-7980-11e5-9d02-1914c9f00505.txt",
		  "description": "123",
		  "documentType": "txt",
		  "order": 2,
		  "data": { "mimetype": "text/plain" }
		},
		{ "id":38,
		  "title": "watch",
		  "altTag": null,
		  "source": "https://www.youtube.com/watch?v=M1__iWNCyOk",
		  "description": null,
		  "documentType": "",
		  "order": 1,
		  "data":
			{ "originalFileInfo":
			  { "name": "watch",
			    "fullName": "watch",
			    "ext":""
			  },
			  "embedCode": "<iframe width=\"420\" height=\"345\" src=\"http://www.youtube.com/embed/M1__iWNCyOk\" frameborder=\"0\" allowfullscreen></iframe>"
			}
		}
  	  ],
	  "categories": [
		{ "id": 13,
		  "name": "Association Services",
		  "description": null,
		  "isPrivate": false,
		  "isVisible": false,
		  "order": 3,
		  "type": "user",
		  "data": null,
		  "groupId": null
		}
	  ],
	  "tags": [
		{ "id": 5,
		  "name": "QA",
		  "slug": "QA",
		  "description": null
		}
	  ],
	  "sMOptions": [
		{ "id":1,
		  "name": "Membership"
		}
	  ],
	  "audienceOptions": [
		{ "id":1,
		  "name":"Manufacturers & Members (MM)"
		}
	  ],
	  "lastEdit":
		{ "username": "Admin Main",
		  "updated": "2015-12-08T22:04:47.175Z"
		}
	}
],
"count": 1
}
*/