module.exports = function( a, sign, b, options ) {
	
	var isTrue = false
	
	switch (sign) {
		case "==":
			isTrue = a == b
			break;
		case "!=":
			isTrue = a != b
			break;
		case ">=":
			isTrue = a >= b
			break;
		case "<=":
			isTrue = a <= b
			break;
		case ">":
			isTrue = a > b
			break;
		case "<":
			isTrue = a < b
			break;
		case "||":
			isTrue = a || b
			break;
		case "&&":
			isTrue = a && b
			break;
	}
	
	return isTrue ? options.fn(this) : options.inverse(this)
}