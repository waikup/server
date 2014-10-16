var Plugin = {
	host: 'http://35cb0e44.ngrok.com'
}

Plugin.getConfig = function() {
	var hashes = window.location.hash.split('#')[1].split('&'),
		args = {attr:{}}

	hashes.forEach(function(val) {
		var v = val.split('=')
		args[v[0]] = JSON.parse(decodeURIComponent(v[1]))
	})

	return args
}

Plugin.sendConfig = function(attr) {
	parent.postMessage(JSON.stringify(attr), '*')
}