var Plugin = {
	host: 'http://localhost:8888'
}

Plugin.getConfig = function() {
	var hashes = window.location.hash.split('#')[1].split('&'),
		args = {}

	console.log('[Plugin] '+hashes)

	hashes.forEach(function(val) {
		console.log('[Plugin] '+val)
		var v = val.split('=')
		args[v[0]] = JSON.parse(decodeURIComponent(v[1]))
	})

	console.log('[Plugin] '+args)
	args.attr = JSON.parse(args.attr)
	return args
}

Plugin.sendConfig = function(attr) {
	var data = {attr: attr}
	parent.postMessage(JSON.stringify(data), Plugin.host)
}