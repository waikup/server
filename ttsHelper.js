var request = require('request')

var endpoint = 'http://130.206.83.103' + '/tts/v1'

var TTSHelper = {}

TTSHelper.tts = function(text) {
	return request({
		method: 'POST',
   		url: endpoint,
   		params: {text: text},
		json: true
  	})
}

module.exports = TTSHelper