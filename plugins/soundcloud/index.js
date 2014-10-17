var	request = require('request')

module.exports = function (stream, attr, callback) {

	attr.songId = attr.songId || 165242233;

	request.get('http://api.soundcloud.com/tracks/' + attr.songId + '/stream?client_id=5a8edbed865ed2b31acf4d9720696e7f').pipe(stream);
	
}