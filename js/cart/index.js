/**
 * Created by david on 12/3/15.
 */

var api_endpoints = {
	'getEventOptions': '/ajax/get-event-options',
	'addToCart': '/ajax/add-event-options-to-cart',
	'addEventToCart': '/ajax/add-event-to-cart',
	'deleteFromCart': '/ajax/delete-item-from-cart',
	'deleteCart': '/ajax/delete-cart',
	'placeOrder': '/ajax/place-order'
};
var a = [{"0":{"Quantity":"0"},"1":{"Description":"a. Welcome Reception - Wednesday, July 1"},"2":{"WebDescript":""},"3":{"Cost":"0.00"},"4":{"Type":"ACCE"},"5":{"Id":"125487"},"6":{"CanChangeQuantity":"true"},"7":{"MaxQuantity":"0"},"8":{"ParticipantsPerQuantity":"0"},"9":{"optionsoldout":"false"},"10":{"TotalAvailable":"-16"},"11":{"Capacity":"0"},"12":{"hasamenities":"false"},"13":{"AlreadyRegistered":"false"}},{"0":{"Quantity":"0"},"1":{"Description":"b. Continental Breakfast - Thursday, July 2"},"2":{"WebDescript":""},"3":{"Cost":"0.00"},"4":{"Type":"ACCE"},"5":{"Id":"125490"},"6":{"CanChangeQuantity":"true"},"7":{"MaxQuantity":"0"},"8":{"ParticipantsPerQuantity":"0"},"9":{"optionsoldout":"false"},"10":{"TotalAvailable":"-15"},"11":{"Capacity":"0"},"12":{"hasamenities":"false"},"13":{"AlreadyRegistered":"false"}},{"0":{"Quantity":"0"},"1":{"Description":"c. Lunch - Thursday, July 2"},"2":{"WebDescript":""},"3":{"Cost":"0.00"},"4":{"Type":"ACCE"},"5":{"Id":"125494"},"6":{"CanChangeQuantity":"true"},"7":{"MaxQuantity":"0"},"8":{"ParticipantsPerQuantity":"0"},"9":{"optionsoldout":"false"},"10":{"TotalAvailable":"-14"},"11":{"Capacity":"0"},"12":{"hasamenities":"false"},"13":{"AlreadyRegistered":"false"}},{"0":{"Quantity":"0"},"1":{"Description":"d. Gold Sponsorship"},"2":{"WebDescript":""},"3":{"Cost":"500.00"},"4":{"Type":"ACCE"},"5":{"Id":"125491"},"6":{"CanChangeQuantity":"true"},"7":{"MaxQuantity":"0"},"8":{"ParticipantsPerQuantity":"0"},"9":{"optionsoldout":"false"},"10":{"TotalAvailable":"0"},"11":{"Capacity":"0"},"12":{"hasamenities":"false"},"13":{"AlreadyRegistered":"false"}},{"0":{"Quantity":"0"},"1":{"Description":"e. Silver Sponsorship"},"2":{"WebDescript":""},"3":{"Cost":"250.00"},"4":{"Type":"ACCE"},"5":{"Id":"125492"},"6":{"CanChangeQuantity":"true"},"7":{"MaxQuantity":"0"},"8":{"ParticipantsPerQuantity":"0"},"9":{"optionsoldout":"false"},"10":{"TotalAvailable":"0"},"11":{"Capacity":"0"},"12":{"hasamenities":"false"},"13":{"AlreadyRegistered":"false"}},{"0":{"Quantity":"0"},"1":{"Description":"f. Bronze Sponsorship"},"2":{"WebDescript":""},"3":{"Cost":"150.00"},"4":{"Type":"ACCE"},"5":{"Id":"125493"},"6":{"CanChangeQuantity":"true"},"7":{"MaxQuantity":"0"},"8":{"ParticipantsPerQuantity":"0"},"9":{"optionsoldout":"false"},"10":{"TotalAvailable":"0"},"11":{"Capacity":"0"},"12":{"hasamenities":"false"},"13":{"AlreadyRegistered":"false"}}];

// Hook up cart functions to the main exports
exports.getEventOptions = getEventOptions
exports.addToCart = addToCart
exports.addEventToCart = addEventToCart
exports.buildOptions = buildOptions
exports.justInteger = justInteger
exports.addQuantity = addQuantity
exports.validateAvailability = validateAvailability
exports.enableOption = enableOption
exports.evAddToCart = evAddToCart
exports.evRemoveFromCart = evRemoveFromCart
exports.evEmptyCart = evEmptyCart
exports.number_format = number_format
exports.placeOrder = placeOrder
exports.resetStateField = resetStateField

/*
	Inside of this file:

		All of the functions are scoped to this file. Inside of this file they can
		be called by their normal names like getEventOptions(119)

	Outside of this file (for instance on a DOM element, or onclick handlers):

		They must be accessed through the Cubic global variable. For instance:
		window.Cubic.cart.getEventOptions(119)
*/

function addEventToCart() {
	$('.alert').remove();
	$('#btn_addMembToCart').prop('disabled', true).html('<i class="fa fa-spinner fa-pulse"></i> Please wait ...');
	$.ajax({
		type: "POST",
		url: api_endpoints.addEventToCart,
		data: {
			eventId: $('#eventId').val()
		},
		success: function(data, textStatus, jqXHR) {
			if ( !isNaN(Math.abs(data)) ) {
				// TODO all fine
				$('.addToCartResponse').empty().append('<div style="width:100%;" class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Success!</strong> The registration was added to the cart. Now select Add-ons below before check out.</div>');
				$('#btn_addToCart').prop('disabled',false);
				$('#btn_addMembToCart').hide();
				$('#btn_goToCart').show();
				$('html, body').animate({
					scrollTop: $("#btn_goToCart").offset().top
				}, 800);
			} else {
				$('.addToCartResponse').empty().append('<div style="width:100%;" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> The registration could not be added to the cart at this moment. Please try later.</div>');
				$('#btn_addMembToCart').prop('disabled',false).html('Add To Cart');
				$('#btn_addToCart').prop('disabled',true);
				$('#btn_goToCart').hide();
			}
		}
	});
}

function addToCart(eventOptions)
{
	// turn the add to cart button into an spinnig
	$('.alert').remove();
	$('#btn_addToCart').prop('disabled',true).html('<i class="fa fa-spinner fa-pulse"></i> Please wait ...');
	$.ajax({
		type: "POST",
		url: api_endpoints.addToCart,
		data: {eventOptions: eventOptions},
		success: function(data, textStatus, jqXHR){
			if (!isNaN(Math.abs(data))) {
				// go to the cart page.
				window.location.href = '/cart';
				$('.addToCartResponse').append('<div style="width:100%;" class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Success!</strong> The event add-ons were added to the cart.</div>');
				$('#btn_addToCart').prop('disabled',true).html('Add Add-ons To Cart');
			} else {
				$('.addToCartResponse').append('<div style="width:100%;" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> The options could not be added to the cart at this moment. Please try later.</div>');
				$('#btn_addToCart').prop('disabled', false).html('Add Add-ons To Cart');
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			$('..addToCartResponse').append('<div style="width:100%;" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> The options could not be added to the cart at this moment. Please try later.</div>');
			$('#btn_addToCart').prop('disabled',false).html('Add Add-ons To Cart');
			$('html, body').animate({
				scrollTop: $(".addToCartResponse").offset().top
			}, 800);
		},
		dataType: 'json'
	});
}

function evRemoveFromCart(TransId)
{
	$('#btn' + TransId).prop('disabled',true).html('<i class="fa fa-spinner fa-pulse"></i> Removing ...');
	$.post(api_endpoints.deleteFromCart, {TransId: TransId},function(data, status, jqxhr){
		// if everything went fine delete item from shopping cart.
		if (data.DeleteItemFromCartResult == 'true') {
			$('#tr'+TransId).remove();
			// now calculate the new total
			var items = $('.item-cost');
			var items_shipping = $('.item-shipping');
			var subtotal = 0;
			var shipping = 0;
			var total = 0;
			$.each(items, function(index,item){
				item = $(item);
				subtotal = subtotal + parseFloat(item.html());
			});
			$.each(items_shipping, function(index,item){
				item = $(item);
				shipping = shipping + parseFloat(item.val());
			});
			// set the subtotal.
			$('.cart-subtotal').html(number_format(subtotal,2));
			$('.cart-shipping').html(number_format(shipping,2));
			// set the total.
			total = subtotal + shipping;
			$('.cart-total').html('$' + number_format(total,2));
		} else {
			$('.message-error').append('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> The item could not be removed this time. Please try again later.</div><br />');
			$('#btn' + TransId).prop('disabled',false).html('<span class="glyphicon glyphicon-remove"></span> Remove');
		}
	}).fail(function(response){
		$('.message-error').append('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> The item could not be removed this time. Please try again later.</div><br />');
		$('#btn' + TransId).prop('disabled',false).html('<span class="glyphicon glyphicon-remove"></span> Remove');
	});
}

function evEmptyCart() {
	$('.cart-empty').prop('disabled',true).html('<i class="fa fa-spinner fa-pulse"></i> Emptying cart ...');
	$.post(api_endpoints.deleteCart, function(data, status, jqxhr){
		if (data.DeleteCartResult == 'true') {
			$('table.cart').remove();
			$('div.cart-container').html('Your cart is empty. Please visit our <a href="/events">events page</a> to see more options.<br /><br />');
		} else {
			$('.message-error').append('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> The cart could not be emptied this time. Please try again later.</div><br />');
			$('.cart-empty').prop('disabled',false).html('Empty Cart');
		}
	}).fail(function(response){
		$('.message-error').append('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> The cart could not be emptied this time. Please try again later.</div><br />');
		$('.cart-empty').prop('disabled',false).html('Empty Cart');
	});
}

function getEventOptions (eventId)
{
	$.get(api_endpoints.getEventOptions + '/' + eventId, function(data, textStatus, jqXHR) {
		buildOptions(data);
	}, 'json').fail(function(data, textStatus, jqXHR){
		$('.event-options-list').html(data.responseJSON.message);
	});
}

// building the DOM to show the Event Options.
function buildOptions (data)
{
	var div_options = $('.event-options-list');
	var table = $('<table>',{'class':'table table-condensed','style':'width:100%;font-size:13px;','cellpading':'5','cellspacing':'5'});
	var header = $('<thead>').append('<tr><th colspan="2">Add-on</th><th>Available</th><th style="text-align:right;">Price (USD)</th><th style="text-align:right;">Quantity</th></tr>');
	// add header to table
	table.append(header);
	var tbody = $('<tbody>');
	$.each(data,function(index,option){
		var tr = $('<tr>');
		var td_desc = $('<td>',{'style':'text-align:left;'}).append('<strong>' + option["1"].Description + '</strong>');
		var td_available = $('<td>').append(Math.abs(parseInt(option["10"].TotalAvailable)));
		var cost = $('<input>',{'type':'hidden','name':'cost_'+index,'value':option["3"].Cost});
		var opt_type = $('<input>',{'type':'hidden','name':'opt_type_'+index,'value':option["4"].Type,'id':'opt_type_'+index,'value':option["4"].Type});
		var td_cost = $('<td>',{'style':'text-align:right;'}).append(option["3"].Cost).append(cost).append(opt_type);
		if (option["13"].AlreadyRegistered == "false" && parseInt(option["10"].TotalAvailable) > 0) {
			var td_option = $('<td>').append('<input style="display:none;" type="checkbox" name="eventOption" id="option_' + index + '" value="' + option["5"].Id + '">');
			td_option.append('<i class="fa fa-square-o" id="chk_' + index + '"></i>');
			var quantity = $('<input>',{'type':'text','class':'form-control','onKeyDown':'window.Cubic.cart.justInteger(event)','onBlur':'window.Cubic.cart.validateAvailability(' + Math.abs(parseInt(option["10"].TotalAvailable)) + ',this)','onChange':'window.Cubic.cart.enableOption(\'option_' + index + '\',this)','name':'quantity_'+index,'id':'quantity_'+index,'value':0});
			var quantity_container = $('<div>',{'class':'input-group spinner','style':'float:right;'}).append('<div class="input-group-btn-vertical"><button class="btn btn-default" onclick="window.Cubic.cart.addQuantity(1,' + Math.abs(parseInt(option["10"].TotalAvailable)) + ',\'' + 'quantity_' + index + '\',' + index + ')" type="button"><i class="fa fa-caret-up"></i></button> <button class="btn btn-default" onclick="window.Cubic.cart.addQuantity(-1,' + Math.abs(parseInt(option["10"].TotalAvailable)) + ',\'' + 'quantity_' + index + '\',' + index + ')" type="button"><i class="fa fa-caret-down"></i></button></div>');
		} else {
			var td_option = $('<td>').append('<i class="fa fa-square-o" id="chk_' + index + '"></i>');
			var quantity = $('<input>',{'type':'text','class':'form-control','disabled':'disabled','name':'quantity_'+index,'value':0});
			var quantity_container = $('<div>',{'class':'input-group spinner','style':'float:right;'}).append('<div class="input-group-btn-vertical"><button class="btn btn-default" disabled="disabled" type="button"><i class="fa fa-caret-up"></i></button> <button class="btn btn-default" disabled="disabled" type="button"><i class="fa fa-caret-down"></i></button></div>');
		}
		quantity_container.prepend(quantity);
		var td_quantity = $('<td>',{'style':'text-align:right;'}).append(quantity_container);
		// append all objects to the TR
		tr.append(td_option);
		tr.append(td_desc);
		tr.append(td_available);
		tr.append(td_cost);
		tr.append(td_quantity);
		// add row to body table.
		tbody.append(tr);
	});
	// add body to table.
	table.append(tbody);
	// add table to div of options
	div_options.empty();
	if (!Array.isArray(data)) {
		div_options.append("No Add-ons available");
		$('#btn_addToCart').hide();
	} else {
		div_options.append("<h2>Add-ons</h2>").append(table);
		$(".event-options-list").removeClass('text-center');
		$('#btn_addToCart').show('slow');
	}
}

function justInteger(e)
{
	// Allow: backspace, delete, tab, escape, enter and .
	if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			// Allow: Ctrl+A
		(e.keyCode == 65 && e.ctrlKey === true) ||
			// Allow: Ctrl+C
		(e.keyCode == 67 && e.ctrlKey === true) ||
			// Allow: Ctrl+X
		(e.keyCode == 88 && e.ctrlKey === true) ||
			// Allow: home, end, left, right
		(e.keyCode >= 35 && e.keyCode <= 39)) {
		// let it happen, don't do anything
		return;
	}
	// Ensure that it is a number and stop the keypress
	if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		e.preventDefault();
	}
}

function addQuantity(inc,max,objId,index)
{
	var quantityField = $('#'+objId);
	var quantity = parseInt(quantityField.val()) + inc;
	if (quantity <= 0) {
		quantity = 0;
		$('#option_' + index).prop('checked',false);
		$('#chk_' + index).removeClass('fa-check-square-o').addClass('fa-square-o');
	}
	if (quantity > max) {
		quantity = max;
	}
	if (quantity <= max && quantity > 0) {
		$('#option_' + index).prop('checked',true);
		$('#chk_' + index).removeClass('fa-square-o').addClass('fa-check-square-o');
	}
	quantityField.val(quantity);
}

function validateAvailability(max,obj)
{
	if (parseInt(obj.value) > 0 && parseInt(obj.value) < max) {
		return true;
	}
	obj.value = 0;
	return false;
}

function enableOption(optionFieldId,obj)
{
	if (parseInt(obj.value) > 0) {
		$('#' + optionFieldId).prop('checked',true);
		return;
	}
	$('#' + optionFieldId).prop('checked',false);
}

function evAddToCart()
{
	var options = $('input[type="checkbox"]:checked');
	var eventOptions = [];
	var i = 0;
	var optionId = [];
	if(options.length == 0) return;
	$.each(options,function(index,option){
		option = $(option);
		optionId = option.prop('id').split('_');
		eventOptions[i] = {
			'intOption_Id': parseInt(option.val()),
			'strType': $('#opt_type_' + optionId[1]).val(),
			'intQuantity': parseInt($('#quantity_' + optionId[1]).val())
		};
		i = i + 1;
	});
	addToCart(eventOptions);
}

function number_format(number, decimals, dec_point, thousands_sep)
{
	number = (number + '')
		.replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function(n, prec) {
			var k = Math.pow(10, prec);
			return '' + (Math.round(n * k) / k)
					.toFixed(prec);
		};
	// Fix for IE parseFloat(0.55).toFixed(0) = 0;
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
		.split('.');
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[1] || '')
			.length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1)
			.join('0');
	}
	return s.join(dec);
}

function placeOrder()
{
	$('#placeorder').prop('disabled',true).html('<i class="fa fa-spinner fa-pulse"></i> Processing ...');
	var exp_date = /^(\d\d\/\d\d)$/;
	var cvc_code = /^(\d{3,4})$/;
	var result = $('#cardNumber').validateCreditCard({accept: ['visa','mastercard','amex','discover']});
	if (result.valid && exp_date.test($('#cardExpiry').val()) && cvc_code.test($('#cardCVC').val())) {
		// we can send the card to be processed.
		$.post(api_endpoints.placeOrder, {credit_card: $('#cardNumber').val(), exp_date: $('#cardExpiry').val(), cvc: $('#cardCVC').val()}, function(data, status, jqxhr){
			if (data['0'] != undefined) {
				if (data['0'].Success == 'false') {
					$('.cc-form').prepend('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> ' + data['4'].Message + '.</div>');
					$('#placeorder').prop('disabled',false).html('Place Order');
				} else {
					$('.checkout-content').empty();
					$('.checkout-title').empty();
					var div_content = $('<div>',{'class':'col-md-12 col-sm-12 col-xs-12'});
					div_content.append($('<h1>').append('Thank You!'));
					div_content.append($('<p>').append('<br />Dear <strong>' + data['5'].ContactName + '</strong>, <br />We appreaciate your recent purchase of some event options. Take note of your order number: <strong>' + data['16'].OrderNumber + '</strong>, keep this number safe for future reference. Please have a look at other event options from our <a href="/events">events page</a>'));
					$('.checkout-content').append(div_content);
				}
			} else {
				$('.cc-form').prepend('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> There were some errors trying to process your card. Please make sure that all your information is correct and try again.</div>');
				$('#placeorder').prop('disabled',false).html('Place Order');
			}

		}).fail(function(response){
			$('.cc-form').prepend('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> There were some errors trying to process your card. Please make sure that all your information is correct and try again.</div>');
			$('#placeorder').prop('disabled',false).html('Place Order');
		});
	} else {
		$('.cc-form').prepend('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> There are some errors in your Credit Card Information. Please fix and try again.</div>');
		if (!result.valid) {
			$('.group-cc').addClass('has-error');
		}
		if (!exp_date.test($('#cardExpiry').val())) {
			$('.group-expdate').addClass('has-error');
		}
		if (!cvc_code.test($('#cardCVC').val())) {
			$('.group-cvc').addClass('has-error');
		}
		$('#placeorder').prop('disabled',false).html('Place Order');
		return false;
	}
}

function resetStateField(containerClass)
{
	$('.'+containerClass).removeClass('has-error');
	//$('.alert').fadeOut().remove();
}