SC.initialize({
    client_id: "5a8edbed865ed2b31acf4d9720696e7f"
})

$(document).on('ready', function() {
	var id = Plugin.getConfig()['attr']['songId']
	if (!id) return

	SC.get("/tracks/"+id+".json", null, function(track) {
		appendLi(track)
	})
})

function search(query, cb) {
	SC.get("/tracks", {q: query, limit: 5}, cb)
}

function appendLi(track) {
	var a = $('<a>').text(track.title).append('<img src="'+track.artwork_url+'">'),
		li = $('<li>').data('songId', track.id).append(a)

	$('ul').append(li)
}

$('input').on('keyup', function(e) {
	$('ul').html('')
	search($(this).val(), function(tracks) {
		tracks.forEach(function(track) {
			appendLi(track)
		})
	})
})

$('ul').on('click', 'li', function() {
	Plugin.sendConfig({'songId': parseInt($(this).data('songId'))})
})