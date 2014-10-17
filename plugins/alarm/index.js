//var moment = require("moment")
var request = require('request');

var tts = require(process.cwd() + '/tts');

module.exports = exports = function (stream, attr, cb){
    //request('http://uhmp3.com/user-mp3-to/8_wiggle-ft-snoop-dogg-jason-derulo.mp3').pipe(stream);
    tts('Good morning Jorge', 'en', stream);
}