var request = require('request')

var endpoint = 'http://130.206.83.103' + '/tts/v1'

var tts = function(text, lang) {
	return request({
		method: 'POST',
   		url: endpoint,
   		params: {text: text, lang: lang || 'en'},
		json: true
  	})
}

module.exports = tts;