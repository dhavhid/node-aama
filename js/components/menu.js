var userStub = {
	user : {
		strUserName: 'ZGCQBSSS',
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
		blnTeamCaptain: 'false'
	}
}

function _openCloseMenu() {
	
	$('.navbar-menu').click(function(e) {
		
		$('.navbox').slideDown('slow')
		$('.navbar').animate({
			opacity: 0
		}, 500, function() {
			$(this).hide()
		})
		e.preventDefault()
		e.stopPropagation()

		$(document).one('click', function closeMenu(e) {
			if ($('.navbox').has(e.target).length === 0) {
				$('.navbox').slideUp('slow')
				$('.navbar').show()
				$('.navbar').css('opacity',0)
				$('.navbar').animate({
					opacity: 100
				}, 500)
			}
			else {
				$(document).one('click', closeMenu)
			}
		})
	})

	$('.menu-close').click(function() {
		$('.navbox').slideUp('slow')
		$('.navbar').show()
		$('.navbar').css('opacity',0)
		$('.navbar').animate({
			opacity: 100
		}, 500)
	})

	$('.tab-menu .tabs li').click(function() {
		$('.tab-menu .tabs li').removeClass("active")
		$(this).addClass("active")
	})
	
}

function _loginBox() {
	
	var $login = $('.navbox-login')
	var $user = $('.navbox-user')
	var $links = $('.navbox-links')
	
	var user = Cookies.getJSON('user')
	
	if( typeof user === "object" ) {
		$user.find('.username').text( user.strFirstName + " " + user.strLastName )
		$user.show()
		$links.hide()
	} else $links.show()
}

function _floatMenu() {

	$(window).scroll(function() {
		var fullscreen = window.matchMedia("(max-height: 640px)").matches && window.matchMedia("(max-width: 600px)").matches

		if (!fullscreen) {
			if($('.navbox').offset().top+$('.navbox').outerHeight() <= $('footer').offset().top && $(window).scrollTop()+$('.navbox').outerHeight() < $('footer').offset().top) {
				if(!$('.navbox').hasClass('fixed')) {
					$('.navbox').addClass('fixed');
					$('.navbox').css( { top: 0 } )
				}
			}
			else {
				if($('.navbox').hasClass('fixed')) {
					$('.navbox').removeClass('fixed');
					$('.navbox').offset( { top: ($('footer').offset().top - $('.navbox').outerHeight()) } )
				}
			}
		}
		else {
			if(!$('.navbox').hasClass('fixed')) {
				$('.navbox').addClass('fixed');
				$('.navbox').css( { top: 0 } )
			}
		}
	})
	$(window).resize(function() {
		if(!$('.navbox').hasClass('fixed')) {
			$('.navbox').addClass('fixed');
			$('.navbox').css( { top: 0 } )
		}
	})
	
	$(window).scroll()
}

jQuery(function($) {

	_openCloseMenu()
	_loginBox()
	_floatMenu()
})