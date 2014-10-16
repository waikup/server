var moment = require("moment")
var request = require('request');
//var tts = require(__dirname + '/../../core/helpers/tts');

module.exports = exports = function (stream, attr, cb){

    console.log(attr);

	// if (!attr.alarm) return cb()

	// var d = moment(attr.alarm, "HH:mm")

	// if (moment() >= d) d.add('days', 1)
	// tts.speak("Your alarm is set for "+attr.alarm+" "+d.fromNow(), "en-US", cb)
    request('http://uhmp3.com/user-mp3-to/8_wiggle-ft-snoop-dogg-jason-derulo.mp3').pipe(stream);
    callback();

}