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
	Plugin.id = args['id']
	Plugin.token = args['token']

	return args
}

Plugin.sendConfig = function(attr) {
	parent.postMessage(JSON.stringify(attr), '*')
	
	/*var xhr = new XMLHttpRequest()

	xhr.open('POST', Plugin.host+'/api/plugin/'+Plugin.id+'/set', true)

	xhr.setRequestHeader("Content-Type", "application/json")
	xhr.setRequestHeader("X-User-Token", Plugin.token)

	xhr.send(JSON.stringify(attr))*/
}