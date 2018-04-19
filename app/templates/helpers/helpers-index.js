var _ = require('lodash')
var Numeral = require('numeral')
var QueryString = require('query-string')
var StripTags = require('striptags')
var CategoryCodes = require('../../routes/utils/category-codes')

var helpers = {
	json: function(obj) {
		var json = JSON.stringify(obj)
		return _.isUndefined(json) ? "undefined" : json
	},
	
	codeToCategory : CategoryCodes.toName,
	
	categoryToCode : CategoryCodes.toCode,
	
	consolelog: function(obj) {
		return "<script>console.log("+helpers.json(obj)+")</script>"
	},
	
	excerpt: function( html, targetWordLength ) {
		var text = StripTags( html )
		var words = text.split(" ")
		var originalWordLength = words.length
		var excerpt = words.slice(0,targetWordLength).join(" ").replace("\n", "<br/>")
		
		if( originalWordLength > targetWordLength ) {
			excerpt += "..."
		}
		
		return excerpt
	},
	
	dateFormat: require('dateformat'),
	
	displayPercentage: function( number ) {
		if( number > 0 ) {
			return Math.round( number * 1000 ) / 10 + "%"
		}
	},
	
	displayNumber: function( number, format ) {
		return Numeral(number).format(format)
	},

	and: function( a, b ) {
		return a && b
	},

	or: function( a, b ) {
		return a || b
	},
	
	ternary: function( a, b, c ) {
		return a ? b : c
	},
	
	selected : function(a, b) {
		return a == b ? "selected" : ""
	},

	active : function(a, b) {
		return a == b ? "active" : ""
	},
	
	compare : require('./compare'),

	json2form: require('./json2form'),

	formatPhone: function(phone) {
		if (isNaN(phone)) {
			return phone;
		}
		var number = phone.split("");
		var newPhone = "";
		if (number.length >= 4) {
			newPhone = "-" + number.splice((number.length - 4),4).join("");
		} else { return phone;}
		if(number.length >= 3) {
			newPhone = number.splice((number.length - 3),3).join("") + newPhone;
		} else {return number.join("") + newPhone ;}

		return "(" + number.join("") + ") " + newPhone;
	},

	formatZip: function(zip) {
		if (isNaN(zip)) {
			return zip;
		}
		var number = zip.split("");
		var newZip = "";
		if (number.length >= 5) {
			newZip = number.splice(0,5).join("");
		} else { return zip;}
		if (number.length > 0) {
			newZip = newZip + "-" +number.join("");
		}
		return newZip;
	},

	exists: function(variable, options) {
		if (typeof variable !== 'undefined' && typeof variable !== 'null') {
			return options.fn(this);
		}
		return options.inverse(this);
	},

	defaultValue: function(val, format) {
		if (format == 'number') {
			if (isNaN(val) || val.trim().length == 0) return 0;
		}
		if (format == 'bool') {
			if (val == 'false' || val == '' || val == undefined || val == null) return 'No';
			if (val == 'true') return 'Yes';
		}
		return val;
	},
	
	buildQuery : function( query ) {
		return QueryString.stringify( query )
	},
	
	paginationCount : function( pagination ) {
		return Math.max(1, Math.ceil(pagination.count / pagination.perPage))
	},
	
	paginationHasNext : function( pagination, options ) {
		var pageCount = module.exports.paginationCount( pagination )
		return pagination.page < pageCount ? options.fn(this) : ""
	},
	
	paginationHasPrev : function( pagination, options ) {
		return pagination.page > 1 ? options.fn(this) : ""
	},
	
	paginationNextPage : function( pagination ) {
		return pagination.page + 1
	},
	
	paginationPrevPage : function( pagination ) {
		return pagination.page - 1
	},

	isFirst : function ( number ) {
		return number == 0
	},

	isThird : function ( number ) {
		return (number + 1) % 3 == 0
	},

	length : function ( array ) {
		return array.length
	},

	slugify : function ( string ) {
		return _.kebabCase(string)
	},

	audienceName : function ( audience ) {
		return audience.slice(0,-4)
	}
}

module.exports = helpers