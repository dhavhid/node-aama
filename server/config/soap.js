var EasySoap = require('../../vendor/easysoap')

module.exports = function createSoapClient() {
	
	// 'http://members.aamanet.org/webservice/sbawebservice.asmx'

	return EasySoap.createClient({
		proxy  : 'http://52.70.238.250:44151',
		host   : 'members.aamanet.org',
		path   : '/webservice/sbawebservice.asmx',
		wsdl   : '/webservice/sbawebservice.asmx?wsdl',
	})

	/*return EasySoap.createClient({
		host   : 'members.aamanet.org',
		path   : '/webservice/sbawebservice.asmx',
		wsdl   : '/webservice/sbawebservice.asmx?wsdl',
	})*/
}