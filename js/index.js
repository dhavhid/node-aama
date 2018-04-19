// Cubic global variable
window.Cubic = window.Cubic || {}

require('./plugins/bootstrap')
require('./components/menu')
require('./plugins/galleria')
require('./plugins/daterangepicker')
require('chosen-npm/public/chosen.jquery.min')
require('lodash')
require('bootpag/lib/jquery.bootpag.min')
require('jquery.inputmask')
var Overlay = require('./plugins/overlay')
var Masonry = require('masonry-layout')
var committee = require('./committee')
var moment = require('moment')
var business = require('./memberdirectory')
var ls = require('local-storage')
var products = require('./products')
var user = require('./user')
var cart = require('./cart')
var search = require('./search')
var labs = require('./labs')
var helpers = require('./plugins/helpers')

// Hook up internal components to the Cubic global object
_.extend(window.Cubic, {
	cart : cart,
	user : user,
	committee: committee,
	moment : moment,
	search : search,
	business : business,
	labs : labs,
	helpers: helpers,
	ls : ls,
	products: products,
	Masonry : Masonry,
	Overlay : Overlay,
	showLoginBox : function() {
		$('.navbox-login').show();
		$('.navbox-links').hide();
	}
})