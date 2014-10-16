var	request = require('request')

module.exports = function (stream, attr, callback) {

	attr.id = attr.id || 165242233;

	request.get('http://api.soundcloud.com/tracks/' + attr.id + '/stream?client_id=5a8edbed865ed2b31acf4d9720696e7f').pipe(stream);
	
}