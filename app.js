var http = require('http');
var net = require('net');
var mongoose = require('mongoose');
var async = require('async');

global.config = require('./config/' + 
                (process.env.NODE_ENV || 'development'));

var api = require('./api');
var audio = require('./api/audio');
var models = require('./models');

var httpServer = http.createServer(api);
httpServer.listen(config.http.port);

setInterval(function (){
    var Alarm = mongoose.model('Alarm');

    Alarm.getAlarmsToPerform(function (err, alarms){
        if (err) return console.log(err);
        if (alarms){
            async.map(alarms, function (alarm, cb){
                console.log(alarm);
            }, function (err){
                console.log(err, 'SACOMPLETAU');
            });
        } else {
            console.log('No alarms');
        }
    });

}, 1000);