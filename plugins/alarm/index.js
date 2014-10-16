//var moment = require("moment")
var request = require('request');
//var tts = require(__dirname + '/../../core/helpers/tts');

module.exports = exports = function (stream, attr, cb){
    console.log(attr);
    request('http://uhmp3.com/user-mp3-to/8_wiggle-ft-snoop-dogg-jason-derulo.mp3').pipe(stream);
    cb();
}