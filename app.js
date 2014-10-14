var http = require('http');
var net = require('net');
var mongoose = require('mongoose');
var async = require('async');

global.env = (process.env.NODE_ENV || 'development');
global.config = require('./config/' + env);

mongoose.connect(config.db.url);

var api = require('./api');
var audio = require('./api/audio');

var models = require('./models'); // Loads all models
var Alarm = mongoose.model('Alarm');

var httpServer = http.createServer(api);
httpServer.listen(config.http.port);

setInterval(function (){

    Alarm.getAlarmsToPerform(function (err, alarms){
        if (err) return console.log(err);
        if (alarms && alarms.length){
            async.map(alarms, function (alarm, cb){
                console.log(alarm);
            }, function (err){
                console.log(err, 'SACOMPLETAU');
            });
        } else {
            console.log('No alarms');
        }
    });

}, 60 * 1000);