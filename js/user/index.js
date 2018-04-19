var validationTests = {
	notempty: /^([a-zA-Z0-9\.\s\#\@\-\_\+\,\;\:\']{1,})$/,
	string: /^([a-zA-Z]{3,})([a-zA-Z\s]*)$/,
	number: /^([0-9]{1,})$/,
	phone: /^([0-9\-\+\(\)\s]{5,})$/,
	email: /^([0-9a-zA-Z+-\.]{3,})\@([0-9a-zA-Z+-]{3,})\.([a-zA-Z]{2,3})([a-zA-Z\.]*)$/,
	zipcode: /^([0-9]{3,5})$/,
	state: /^([A-Z]{2})$/,
	country: /^([A-Z]{2})$/,
	link: /^(http)([:\/\/\.a-zA-Z0-9\-\_\#]{5,})/
};
var validationErrors = {
	name: "<li>Type the name of the Business. Make sure it is at least 3 characters long.</li>",
	firstname: "<li>Type your First Name. Make sure it is at least 3 characters long.</li>",
	lastname: "<li>Type your Last Name. Make sure it is at least 3 characters long.</li>",
	phone: "<li>Type your Phone number. Make sure to add your country code if not in the US.</li>",
	phone2: "<li>Check that you have typed your alternative Phone Number correctly. Make sure to add your country code if not in the US.</li>",
	fax: "<li>Check that you have typed your Fax number correctly. Make sure to add your country code if not in the US.</li>",
	email: "<li>Check that you have typed your Email correctly. Make sure that it contains a username and a domain name.</li>",
	city: "<li>Type the City of your address.</li>",
	state: "<li>Select the State of your address.</li>",
	zipcode: "<li>Type the Zipcode of your address. Make sure it is from 3 to 5 digits long.</li>",
	country: "<li>Select your Country.</li>",
	city_oa: "<li>Type the City of your additional address.</li>",
	state_oa: "<li>Select the State of your additional address.</li>",
	zipcode_oa: "<li>Type the Zipcode of your additional address. Make sure it is from 3 to 5 digits long.</li>",
	country_oa: "<li>Select your Country in your additional address.</li>",
	address_oa: "<li>Type your additional address. Make sure it is at least 3 characters long.</li>",
	link: "<li>Check that the link of the account of your social network is a valid one.</li>",
	pass2: "<li>Your password does not match.</li>"
};
module.exports = function setupUser() {
	return {
		isLogged : function() { return true; },
	}
}
module.exports.addOtherAddress = function addOtherAddress() {
	if ($('#add_other_address').prop('checked')) {
		$('.OtherAddress').removeClass('hidden');
	} else {
		$('.OtherAddress').addClass('hidden');
	}
}
module.exports.validateProfile = function validateProfile(e) {
	var errors = $('<ul>');
	var hasError = false;
	var hasErrorLink = false;
	if (!validationTests.notempty.test($('input[name="FirstName"]').val()) || !validationTests.string.test($('input[name="FirstName"]').val())) {
		errors.append(validationErrors.firstname);
		hasError = true;
		$('input[name="FirstName"]').parent().addClass('has-error');
	}
	if (!validationTests.notempty.test($('input[name="LastName"]').val()) || !validationTests.string.test($('input[name="LastName"]').val())) {
		errors.append(validationErrors.lastname);
		hasError = true;
		$('input[name="LastName"]').parent().addClass('has-error');
	}
	if (!validationTests.phone.test($('input[name="Phone1"]').val())) {
		errors.append(validationErrors.phone);
		hasError = true;
		$('input[name="Phone1"]').parent().addClass('has-error');
	}
	if (validationTests.notempty.test($('input[name="Phone2"]').val())) {
		if (!validationTests.phone.test($('input[name="Phone2"]').val())) {
			errors.append(validationErrors.phone2);
			hasError = true;
			$('input[name="Phone2"]').parent().addClass('has-error');
		}
	}
	if (validationTests.notempty.test($('input[name="Fax"]').val())) {
		if (!validationTests.phone.test($('input[name="Fax"]').val())) {
			errors.append(validationErrors.fax);
			hasError = true;
			$('input[name="Fax"]').parent().addClass('has-error');
		}
	}
	if (!validationTests.notempty.test($('input[name="Email_Address"]').val()) || !validationTests.email.test($('input[name="Email_Address"]').val())) {
		errors.append(validationErrors.email);
		hasError = true;
		$('input[name="Email_Address"]').parent().addClass('has-error');
	}
	if (!validationTests.notempty.test($('input[name="City"]').val())) {
		errors.append(validationErrors.city);
		hasError = true;
		$('input[name="City"]').parent().addClass('has-error');
	}
	if (!validationTests.notempty.test($('select[name="State"]').val()) || !validationTests.state.test($('select[name="State"]').val())) {
		errors.append(validationErrors.state);
		hasError = true;
		$('select[name="State"]').parent().addClass('has-error');
	}
	if (!validationTests.notempty.test($('input[name="Zip"]').val()) || !validationTests.zipcode.test($('input[name="Zip"]').val())) {
		errors.append(validationErrors.zipcode);
		hasError = true;
		$('input[name="Zip"]').parent().addClass('has-error');
	}
	if (!validationTests.notempty.test($('select[name="Country"]').val()) || !validationTests.country.test($('select[name="Country"]').val())) {
		errors.append(validationErrors.country);
		hasError = true;
		$('select[name="Country"]').parent().addClass('has-error');
	}
	if (!validationTests.notempty.test($('input[name="Address1"]').val())) {
		errors.append(validationErrors.address);
		hasError = true;
		$('input[name="Address1"]').parent().addClass('has-error');
	}
	// check additional address only when selected.
	if ($('#add_other_address').prop('checked')) {
		if (!validationTests.notempty.test($('input[name="City_OA"]').val())) {
			errors.append(validationErrors.city_oa);
			hasError = true;
			$('input[name="City_OA"]').parent().addClass('has-error');
		}
		if (!validationTests.notempty.test($('select[name="State_OA"]').val()) || !validationTests.state.test($('select[name="State_OA"]').val())) {
			errors.append(validationErrors.state_oa);
			hasError = true;
			$('select[name="State_OA"]').parent().addClass('has-error');
		}
		if (!validationTests.notempty.test($('input[name="Zip_OA"]').val()) || !validationTests.zipcode.test($('input[name="Zip_OA"]').val())) {
			errors.append(validationErrors.zipcode_oa);
			hasError = true;
			$('input[name="Zip_OA"]').parent().addClass('has-error');
		}
		if (!validationTests.notempty.test($('select[name="Country_OA"]').val()) || !validationTests.country.test($('select[name="Country_OA"]').val())) {
			errors.append(validationErrors.country_oa);
			hasError = true;
			$('select[name="Country_OA"]').parent().addClass('has-error');
		}
		if (!validationTests.notempty.test($('input[name="Address1_OA"]').val())) {
			errors.append(validationErrors.address_oa);
			hasError = true;
			$('input[name="Address1_OA"]').parent().addClass('has-error');
		}
	}
	// now check social links.
	if (validationTests.notempty.test($('input[name="linkedin"]').val())) {
		if (!validationTests.link.test($('input[name="linkedin"]').val())) {
			errors.append(validationErrors.link);
			hasError = true;
			hasErrorLink = true;
			$('input[name="linkedin"]').parent().addClass('has-error');
		}
	}
	if (validationTests.notempty.test($('input[name="twitter"]').val())) {
		if (!validationTests.link.test($('input[name="twitter"]').val())) {
			if (!hasErrorLink) {
				errors.append(validationErrors.link);
			}
			hasError = true;
			hasErrorLink = true;
			$('input[name="twitter"]').parent().addClass('has-error');
		}
	}
	if (validationTests.notempty.test($('input[name="facebook"]').val())) {
		if (!validationTests.link.test($('input[name="facebook"]').val())) {
			if (!hasErrorLink) {
				errors.append(validationErrors.link);
			}
			hasError = true;
			hasErrorLink = true;
			$('input[name="facebook"]').parent().addClass('has-error');
		}
	}
	if (validationTests.notempty.test($('input[name="googleplus"]').val())) {
		if (!validationTests.link.test($('input[name="googleplus"]').val())) {
			if (!hasErrorLink) {
				errors.append(validationErrors.link);
			}
			hasError = true;
			hasErrorLink = true;
			$('input[name="googleplus"]').parent().addClass('has-error');
		}
	}
	if (validationTests.notempty.test($('input[name="youtube"]').val())) {
		if (!validationTests.link.test($('input[name="youtube"]').val())) {
			if (!hasErrorLink) {
				errors.append(validationErrors.link);
			}
			hasError = true;
			hasErrorLink = true;
			$('input[name="youtube"]').parent().addClass('has-error');
		}
	}
	if (validationTests.notempty.test($('input[name="myspace"]').val())) {
		if (!validationTests.link.test($('input[name="myspace"]').val())) {
			if (!hasErrorLink) {
				errors.append(validationErrors.link);
			}
			hasError = true;
			hasErrorLink = true;
			$('input[name="myspace"]').parent().addClass('has-error');
		}
	}
	if (!hasError && !hasErrorLink) {
		// we can submit
		$('.user-error-content').empty();
		$('#alert-error').hide();
		$('#alert-success').hide();
		$('#alert-danger').hide();
		var user = window.Cubic.user.setUserUpdate();
		$('#btn_submit').prop('disabled',true).html('<i class="fa fa-spinner fa-pulse"></i> Please wait ...');
		$.post('/ajax/user-update',{user:user},function(data){
			$('#alert-success').show();
			window.location.href = '#alert-success';
			$('#btn_submit').prop('disabled',false).html('Save');
		}).fail(function(response){
			$('#alert-danger').show();
			window.location.href = '#alert-danger';
			$('#btn_submit').prop('disabled',false).html('Save');
		});
		e.preventDefault();
	} else {
		$('.user-error-content').empty().append(errors);
		$('#alert-error').show();
		window.location.href = '#alert-error';
		e.preventDefault();
	}
	return false;
}
module.exports.setUserUpdate = function setUserUpdate() {
	var user = {
		intMemb_Id: $('input[name="_Memb_Id"]').val(),
		intRep_Id: $('input[name="Rep_Id"]').val(),
		strUserName: $('input[name="Username"]').val(),
		Update: {
			_Memb_Id: $('input[name="_Memb_Id"]').val(),
			Rep_Id: $('input[name="Rep_Id"]').val(),
			Salutation: $('input[name="Salutation"]').val(),
			FirstName: $('input[name="FirstName"]').val(),
			MiddleName: $('input[name="MiddleInitial"]').val(),
			LastName: $('input[name="LastName"]').val(),
			Perferred_Name: $('input[name="Perferred_Name"]').val(),
			Title: $('input[name="Title"]').val(),
			Position: $('input[name="Position"]').val(),
			Formal_Greeting: $('input[name="Formal_Greeting"]').val(),
			Informal_Greeting: $('input[name="Informal_Greeting"]').val(),
			twitter: $('input[name="twitter"]').val(),
			facebook: $('input[name="facebook"]').val(),
			linkedin: $('input[name="linkedin"]').val(),
			myspace: $('input[name="myspace"]').val(),
			youtube: $('input[name="youtube"]').val(),
			googleplus: $('input[name="googleplus"]').val(),
			Email: {
				Email_Id: $('input[name="Email_Id"]').val(),
				Email_Address: $('input[name="Email_Address"]').val()
			},
			Phone1: {
				Phone_Id: $('input[name="Phone1_Id"]').val(),
				Phone: $('input[name="Phone1"]').val(),
				Extension: $('input[name="Extension1"]').val()
			},
			Phone2: {
				Phone_Id: $('input[name="Phone2_Id"]').val(),
				Phone: $('input[name="Phone2"]').val(),
				Extension: $('input[name="Extension2"]').val()
			},
			Fax: {
				Phone_Id: $('input[name="Fax_Id"]').val(),
				Phone: $('input[name="Fax"]').val()
			},
			MailingAddress: {
				Addr_Id: $('input[name="MailAddr_Id"]').val(),
				Address1: $('input[name="Address1"]').val(),
				Address2: $('input[name="Address2"]').val(),
				City: $('input[name="City"]').val(),
				State: $('select[name="State"]').val(),
				Country: $('select[name="Country"]').val(),
				Zip: $('input[name="Zip"]').val(),
				Memb_Id: $('input[name="_Memb_Id"]').val(),
				Rep_Id: $('input[name="Rep_Id"]').val(),
			}
		},
		Memb_Id: $('input[name="_Memb_Id"]').val()
	};
	if ($('#add_other_address').prop("checked")) {
		user.Update.OtherAddress = {
			Addr_Id: $('input[name="OtherAddr_Id"]').val(),
				Address1: $('input[name="Address1_OA"]').val(),
				Address2: $('input[name="Address2_OA"]').val(),
				City: $('input[name="City_OA"]').val(),
				State: $('select[name="State_OA"]').val(),
				Country: $('select[name="Country_OA"]').val(),
				Zip: $('input[name="Zip_OA"]').val(),
				Memb_Id: $('input[name="_Memb_Id"]').val(),
				Rep_Id: $('input[name="Rep_Id"]').val(),
		};
	}
	return user;
}
module.exports.validateBusiness = function validateBusiness(e) {
	var errors = $('<ul>');
	var hasError = false;
	var hasErrorLink = false;
	if (!validationTests.notempty.test($('input[name="Name"]').val()) || !validationTests.string.test($('input[name="Name"]').val())) {
		errors.append(validationErrors.name);
		hasError = true;
		$('input[name="Name"]').parent().addClass('has-error');
	}
	if (!validationTests.phone.test($('input[name="Phone1"]').val())) {
		errors.append(validationErrors.phone);
		hasError = true;
		$('input[name="Phone1"]').parent().addClass('has-error');
	}
	if (!validationTests.notempty.test($('input[name="City"]').val())) {
		errors.append(validationErrors.city);
		hasError = true;
		$('input[name="City"]').parent().addClass('has-error');
	}
	if (!validationTests.notempty.test($('select[name="State"]').val()) || !validationTests.state.test($('select[name="State"]').val())) {
		errors.append(validationErrors.state);
		hasError = true;
		$('select[name="State"]').parent().addClass('has-error');
	}
	if (!validationTests.notempty.test($('input[name="Zip"]').val())) {
		errors.append(validationErrors.zipcode);
		hasError = true;
		$('input[name="Zip"]').parent().addClass('has-error');
	}
	if (!validationTests.notempty.test($('input[name="Address1"]').val())) {
		errors.append(validationErrors.address);
		hasError = true;
		$('input[name="Address1"]').parent().addClass('has-error');
	}
	// check additional address only when selected.
	if ($('#add_other_address').prop('checked')) {
		if (!validationTests.notempty.test($('input[name="City_OA"]').val())) {
			errors.append(validationErrors.city_oa);
			hasError = true;
			$('input[name="City_OA"]').parent().addClass('has-error');
		}
		if (!validationTests.notempty.test($('select[name="State_OA"]').val()) || !validationTests.state.test($('select[name="State_OA"]').val())) {
			errors.append(validationErrors.state_oa);
			hasError = true;
			$('select[name="State_OA"]').parent().addClass('has-error');
		}
		if (!validationTests.notempty.test($('input[name="Zip_OA"]').val()) || !validationTests.zipcode.test($('input[name="Zip_OA"]').val())) {
			errors.append(validationErrors.zipcode_oa);
			hasError = true;
			$('input[name="Zip_OA"]').parent().addClass('has-error');
		}
		if (!validationTests.notempty.test($('input[name="Address1_OA"]').val())) {
			errors.append(validationErrors.address_oa);
			hasError = true;
			$('input[name="Address1_OA"]').parent().addClass('has-error');
		}
	}
	// now check social links.
	if (validationTests.notempty.test($('input[name="linkedin"]').val())) {
		if (!validationTests.link.test($('input[name="linkedin"]').val())) {
			errors.append(validationErrors.link);
			hasError = true;
			hasErrorLink = true;
			$('input[name="linkedin"]').parent().addClass('has-error');
		}
	}
	if (validationTests.notempty.test($('input[name="twitter"]').val())) {
		if (!validationTests.link.test($('input[name="twitter"]').val())) {
			if (!hasErrorLink) {
				errors.append(validationErrors.link);
			}
			hasError = true;
			hasErrorLink = true;
			$('input[name="twitter"]').parent().addClass('has-error');
		}
	}
	if (validationTests.notempty.test($('input[name="facebook"]').val())) {
		if (!validationTests.link.test($('input[name="facebook"]').val())) {
			if (!hasErrorLink) {
				errors.append(validationErrors.link);
			}
			hasError = true;
			hasErrorLink = true;
			$('input[name="facebook"]').parent().addClass('has-error');
		}
	}
	if (validationTests.notempty.test($('input[name="googleplus"]').val())) {
		if (!validationTests.link.test($('input[name="googleplus"]').val())) {
			if (!hasErrorLink) {
				errors.append(validationErrors.link);
			}
			hasError = true;
			hasErrorLink = true;
			$('input[name="googleplus"]').parent().addClass('has-error');
		}
	}
	if (validationTests.notempty.test($('input[name="youtube"]').val())) {
		if (!validationTests.link.test($('input[name="youtube"]').val())) {
			if (!hasErrorLink) {
				errors.append(validationErrors.link);
			}
			hasError = true;
			hasErrorLink = true;
			$('input[name="youtube"]').parent().addClass('has-error');
		}
	}
	if (validationTests.notempty.test($('input[name="myspace"]').val())) {
		if (!validationTests.link.test($('input[name="myspace"]').val())) {
			if (!hasErrorLink) {
				errors.append(validationErrors.link);
			}
			hasError = true;
			hasErrorLink = true;
			$('input[name="myspace"]').parent().addClass('has-error');
		}
	}
	if (!hasError && !hasErrorLink) {
		// we can submit
		$('.user-error-content').empty();
		$('#alert-error, #alert-success, #alert-danger').hide();
		window.Cubic.user.setBusinessUpdate();
		$('#btn_submit').prop('disabled',true).html('<i class="fa fa-spinner fa-pulse"></i> Please wait ...');
		e.preventDefault();
	} else {
		$('.user-error-content').empty().append(errors);
		$('#alert-error').show();
		window.location.href = '#alert-error';
		e.preventDefault();
	}
	return false;
}
module.exports.setBusinessUpdate = function setBusinessUpdate()
{
	$.get('/ajax/business-get', function(data){
		data.Name = $('input[name="Name"]').val();
		data.DBA = $('input[name="DBA"]').val();
		data.BusinessDescription = $('textarea[name="BusinessDescription"]').val();
		data.Phone1.Country_Code = $('input[name="Country_Code"]').val();
		if ($('input[name="Country_Code"]').val().length > 0) data.Phone1.International = true;
		data.Phone1.Phone = $('input[name="Phone1"]').val();
		data.Fax.Phone = $('input[name="Fax"]').val();
		data.Phone2.Phone = $('input[name="Phone2"]').val();
		data.InfoEmail.Email_Address = $('input[name="Email_Address"]').val();
		data.WebSite.Url = $('input[name="Url"]').val();
		data.MailingAddress.City = $('input[name="City"]').val();
		data.MailingAddress.State = $('select[name="State"]').val();
		data.MailingAddress.Zip = $('input[name="Zip"]').val();
		data.MailingAddress.Address1 = $('input[name="Address1"]').val();
		data.MailingAddress.Address2 = $('input[name="Address2"]').val();
		if ($('select[name="Country"]').val().length > 0) {
			data.MailingAddress.Country = $('select[name="Country"]').val();
			data.MailingAddress.International = true;
		}
		if ($('input:checkbox:checked')) {
			data.PhysicalAddress.City = $('input[name="City_OA"]').val();
			data.PhysicalAddress.State = $('select[name="State_OA"]').val();
			data.PhysicalAddress.Zip = $('input[name="Zip_OA"]').val();
			data.PhysicalAddress.Address1 = $('input[name="Address1_OA"]').val();
			data.PhysicalAddress.Address2 = $('input[name="Address2_OA"]').val();
			if ($('select[name="Country_OA"]').val().length > 0) {
				data.PhysicalAddress.Country = $('select[name="Country_OA"]').val();
				data.PhysicalAddress.International = true;
			}
		}
		data.twitter = $('input[name="twitter"]').val();
		data.facebook = $('input[name="facebook"]').val();
		data.linkedin = $('input[name="linkedin"]').val();
		data.myspace = $('input[name="myspace"]').val();
		data.youtube = $('input[name="youtube"]').val();
		data.googleplus = $('input[name="googleplus"]').val();
		// sending data to be updated
		$.post('/ajax/business-update',{data:data},function(response){
			console.log(response)
			$('#alert-success').show();
			window.location.href = '#alert-success';
			$('#btn_submit').prop('disabled',false).html('Save');
		}).fail(function(response){
			$('#alert-danger').show();
			window.location.href = '#alert-danger';
			$('#btn_submit').prop('disabled',false).html('Save');
		});
	});
}