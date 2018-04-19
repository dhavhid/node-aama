var _ = require('lodash')

module.exports = function startAaamRouting( app ) {
	// homepage
	app.get( '/',                          require('./home-route')( app ) )

	app.get( '/ajax/get-event-options/:eventId',  require('./ajax/get-event-options')( app ) )
	app.post( '/ajax/add-event-options-to-cart',  require('./ajax/add-event-options-to-cart')( app ) )

	// shopping cart routes
	app.get(  '/ajax/get-event-options/:eventId/:userId', require('./ajax/get-event-options')( app ) )
	app.post( '/ajax/add-event-options-to-cart',          require('./ajax/add-event-options-to-cart')( app ) )
	app.post( '/ajax/add-event-to-cart',          		  require('./ajax/add-event-to-cart')( app ) )
	app.post( '/ajax/delete-item-from-cart',              require('./ajax/delete-item-from-cart')(app) )
	app.post( '/ajax/delete-cart',                        require('./ajax/delete-cart')(app) )
	app.get(  '/cart',                                    require('./cart/get-cart')( app ) )
	app.get(  '/checkout',                                require('./cart/checkout')( app ) )
	app.post( '/ajax/place-order',                        require('./ajax/place-order')(app) )

	// committees & groups routes
	app.get('/committees',					  			  require('./committee/get-committees')(app) )
	app.get('/committees/:comcode',			  			  require('./committee/get-committees-by-code')(app) )
	//app.get('/committees/:code',	  		  			  require('./committee/get-committees')(app) )
	app.get('/ajax/committees/:page',					  require('./ajax/ajax-get-committees-route')(app) )
	app.get('/ajax/get-committee-meetings/:comCode',      require('./ajax/get-committee-meetings')(app))
	app.get('/ajax/get-committee-members',                require('./ajax/get-committee-members')(app))
	app.post('/ajax/add-to-committee',                    require('./ajax/add-to-committee')(app))
	app.post('/ajax/drop-to-committee',                   require('./ajax/drop-to-committee')(app))
	app.post('/ajax/update-voter-status',                 require('./ajax/update-voter-status')(app))
	app.get('/committees/hierarchy/:hierarchy',           require('./committee/get-committees-by-hierarchy')(app))

    // member login
	app.post( '/session/login',            require('./session/login')( app ) )
	app.post( '/session/logout',           require('./session/logout')( app ) )
	app.get( '/session/user',              require('./session/user')( app ) )
	app.get( '/session/user/edit',         require('./session/user-edit')( app ) )
	app.get( '/session/business/edit',     require('./session/business-edit')( app ))
	app.get( '/ajax/business-get',         require('./ajax/ajax-business-get')( app ))
	app.post( '/ajax/business-update',     require('./ajax/ajax-business-update')( app ))
	app.post( '/ajax/user-update',         require('./ajax/user-update')( app ) )
	app.get( '/session/dashboard',         require('./session/dashboard')( app ) )

	// members directory
	app.get( '/members',        	       require('./membersdirectory/businesses-route')( app ))
	app.post( '/ajax/get-businesses',       require('./ajax/get-businesses')( app ))
	app.get( '/members/business/:id',      require('./membersdirectory/single-business-route')( app ))
	app.get( '/members/business/member/:id', require('./membersdirectory/single-member-route')( app ))

	// Certified Product Directory
    app.get( '/products/search',           require('./products/search-products-route')( app ))
	app.get( '/products',                  require('./products/get-manufacturers-route')( app ))
	app.get( '/products/:id',              require('./products/get-product-route')( app ))
    app.get( '/ajax/products/filters',     require('./ajax/get-products-filter-catalogs-route')( app ))
	app.post( '/ajax/products/search',     require('./ajax/ajax-search-products')( app ))

	// search
	app.get( '/search',                    require('./search/search')( app ) )
	app.post( '/ajax/search',              require('./ajax/search')( app ) )
	app.post( '/ajax/search-sba',          require('./ajax/search-sba')( app ) )

    // events
	app.get( '/events/:id',                require('./events/single-event-route')( app ) )
	app.get( '/events/:id/:name\.:ext',    require('./events/single-eventics-route')( app ) )
	app.get( '/events-category/:category', require('./events/events-route')( app ) )
	app.get( '/events',                    require('./events/events-route')( app ) )

	// accredited labs
	app.get( '/accredited-labs',           require('./labs/labs-listing')( app ))
	app.get( '/ajax/get-lab-standards/:pcloid',   require('./ajax/get-lab-standards')( app ))
	app.post( '/ajax/accredited-labs',     require('./ajax/get-labs-listing')( app ))

    // faqs
	app.get( '/faq',                       require('./pages/faq-route')( app ) )
	app.get( '/faq/:category',             require('./pages/faq-route')( app ) )

    // static pages
	app.get( '/pages/:slug',               require('./pages/static-page-route')( app ) )
    app.get( '/pages/tag/:tag',            require('./pages/static-page-route')( app ) )

    // people page
	app.get( '/people/:slug',              require('./pages/single-people-route')( app ) )
	app.get( '/people',                    require('./pages/people-route')( app ) )

    // blog
    app.get( '/:audience?/:subject?/blog/tag/:tag',            require('./posts/tags-route')( app ) )
    app.get( '/:audience?/:subject?/blog-category/:category',  require('./posts/posts-route')( app ) )
    app.get( '/:audience?/:subject?/blog',                     require('./posts/posts-route')( app ) )
    app.get( '/:audience?/:subject?/pages',                     require('./posts/pages-route')( app ) )
    app.get( '/blog/:id',                                      require('./posts/single-post-route')( app ) )

    // audience filters
    app.get( '/:audience',               require('./home-route')( app ) )
    // app.get( '/manufacturers-members',               require('./home-route')( app ) )
    // app.get( '/architects-professionals',            require('./home-route')( app ) )
    // app.get( '/builders-contractors',                require('./home-route')( app ) )
    // app.get( '/homeowners',                          require('./home-route')( app ) )
    //_.map(['manufacturers-members','architects-professionals','builders-contractors','homeowners'], function(slug) { app.get( '/'+slug,            require('./home-route')( app ) ) } )

    // subject filters
    // app.get( '/manufacturers-members/:subject?',     require('./home-route')( app ) )
    // app.get( '/architects-professionals/:subject?',  require('./home-route')( app ) )
    // app.get( '/builders-contractors/:subject?',      require('./home-route')( app ) )
    // app.get( '/homeowners/:subject?',                require('./home-route')( app ) )
    app.get( '/:audience/:subject?',                require('./subject-route')( app ) )




	app.use(function(req, res, next) {
		res.status(404).render('error', {
			layout: 'static',
			title: '404',
			message: 'Nothing was found here.',
		})
	})
}
